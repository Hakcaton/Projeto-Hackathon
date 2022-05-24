export const GET_DASHBOARD_CARDS_DATA = `
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