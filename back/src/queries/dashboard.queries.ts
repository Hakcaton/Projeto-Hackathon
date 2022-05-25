export const SELECT_DASHBOARD_CARDS_DATA = `
SELECT *
FROM (
    SELECT 
		COUNT(company.cnpj) AS totalCompaniesCount
	FROM 
		company
) AS totalCompany
LEFT JOIN (
	SELECT 
		COUNT(company.cnpj) AS newCompaniesCount
	FROM 
		company
	WHERE
		datediff(current_timestamp(), company.registered_date) < 30
) AS newCompany ON (TRUE)
LEFT JOIN (
	SELECT 
		COUNT(contract.id) AS totalContractsCount
	FROM 
		contract
) AS totalContract ON (TRUE)
LEFT JOIN (
	SELECT 
		COUNT(contract.id) AS newContractsCount
	FROM 
		contract
	WHERE
		datediff(current_timestamp(), contract.initial_date) < 30
) AS newContract ON (TRUE)
LEFT JOIN (
	SELECT 
		COUNT(document.id) AS totalRequestedDocumentsCount
	FROM 
		document
) AS totalRequestedDocument ON (TRUE)
LEFT JOIN (
	SELECT 
		COUNT(document.id) AS newRequestedDocumentsCount
	FROM 
		document
	WHERE
		datediff(current_timestamp(), document.request_date) < 30
) AS newRequestedDocument ON (TRUE)
LEFT JOIN (
	SELECT 
		COUNT(document.id) AS totalApprovedDocumentsCount
	FROM 
		document
	WHERE
		document.status = 3
) AS totalApprovedDocument ON (TRUE)
LEFT JOIN (
	SELECT 
		COUNT(document.id) AS newApprovedDocumentsCount
	FROM 
		document
	WHERE
		datediff(current_timestamp(), document.request_date) < 30 AND
        document.status = 3
) AS newApprovedDocument ON (TRUE)
`

export const SELECT_LAST_30DAYS_DOCUMENTS_OVERVIEW = `
SELECT document.status
FROM
	document
WHERE
	MONTH(CURRENT_TIMESTAMP()) = MONTH(document.request_date)
AND
	YEAR(CURRENT_TIMESTAMP()) = YEAR(document.request_date)
`
export const SELECT_LAST_12MONTHS_DOCUMENTS_OVERVIEW = `
SELECT document.status, document.request_date
FROM
	document
WHERE
	DATE_ADD(CURRENT_TIMESTAMP(), INTERVAL -1 YEAR) < document.request_date
`