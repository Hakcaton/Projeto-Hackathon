export const SELECT_PENDING_FORM_FIELDS_FROM_CONTRACT: string = `
SELECT 
    form_field.id,
	form_field.title,
	form_field.subtitle, 
	form_field.recurrence,
	form_field.individual,
	form_field.required,
	form_field.contract_id AS contractId,
	form_field.first_request_date AS firstRequestDate
FROM
    form_field
WHERE 
(form_field.contract_id = ?)
AND (form_field.individual = 0)
AND (
	(
	NOT EXISTS(
		SELECT 
			1
		FROM
			document
		WHERE
			document.form_field_id = form_field.id
		)
	)
	OR (
		(form_field.recurrence = 1)
		AND (
			EXISTS(
				SELECT 
					document.request_date
				FROM 
					document
				WHERE
					current_date() >= timestampadd(YEAR, 1, document.request_date)
			)
		)
	)
	OR (
		(form_field.recurrence = 2)
		AND (
			EXISTS (
				SELECT 
					document.request_date
				FROM 
					document
				WHERE
					current_date() >= timestampadd(MONTH, 1, document.request_date)
			)
		)
	)
	OR (
		(form_field.recurrence = 3)
		AND (
			EXISTS (
				SELECT 
					document.request_date
				FROM 
					document
				WHERE
					current_date() >= timestampadd(WEEK, 1, document.request_date)
			)
		)
	)
	OR (
		(form_field.recurrence = 4)
		AND(
			EXISTS(
				SELECT 
					document.request_date
				FROM 
					document
				WHERE
					current_date() >= timestampadd(DAY, 1, document.request_date)
			)
		)
	)
)`

export const SELECT_LATEST_DOCUMENTS_FROM_CONTRACT: string = `
SELECT
	document.id, document.status, document.file_stream, document.form_field_id, MAX(document.request_date) AS request_date
FROM
	document
GROUP BY document.form_field_id`

export const SELECT_PENDING_DOCUMENTS_FROM_CONTRACT: string = `
SELECT 
    document.*
FROM
    document
	INNER JOIN
		form_field 
	ON (form_field.id = document.form_field_id)
		AND (form_field.contract_id = ?)
		AND (form_field.individual = 0)
WHERE
	(document.status in (0, 2))`

export const SELECT_SENT_DOCUMENTS_FROM_CONTRACT: string = `
SELECT 
	document.*
FROM
	document
	INNER JOIN
		form_field 
	ON (form_field.id = document.form_field_id)
		AND (form_field.contract_id = ?)
		AND (form_field.individual = 0)
WHERE
	(document.status = 1)
	AND (document.file_stream IS NOT NULL)`

export const SELECT_EMPLOYEES_PENDING_DOCUMENTS_FROM_CONTRACT = `
SELECT 
    document.*, form_field.contract_id, form_field.title, form_field.subtitle
FROM
    document
	INNER JOIN
		form_field 
	ON (form_field.id = document.form_field_id)
		AND (form_field.contract_id = ?)
		AND (form_field.individual = 1)
WHERE
	(document.status in (0, 2))`

export const SELECT_EMPLOYEES_SENT_DOCUMENTS_FROM_CONTRACT = `
SELECT 
	document.*, form_field.contract_id, form_field.title, form_field.subtitle
FROM
	document
	INNER JOIN
		form_field 
	ON (form_field.id = document.form_field_id)
		AND (form_field.contract_id = ?)
		AND (form_field.individual = 1)
WHERE
	(document.status in (1, 3))`


export const SELECT_EMPLOYEES_DOCUMENTS_FROM_CONTRACT = `
SELECT
	document.*
FROM
	form_field
INNER JOIN document ON (document.form_field_id = form_field.id)
WHERE
	form_field.contract_id = ?
AND
	form_field.individual = 1`