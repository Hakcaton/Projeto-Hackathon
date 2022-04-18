export const SELECT_PENDING_FORM_FIELDS_FROM_CONTRACT: string = `
SELECT 
    form_field.*
FROM
    form_field
WHERE 
(form_field.contract_id = ?)
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
		AND (form_field.contract_id = '0123456')
WHERE
	(document.status in (0, 2))`