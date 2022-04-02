import { FilterMatchMode } from 'primereact/api';

export const certificationOptionTemplate = (option) => {
    return <span className={`certification certification__${option.value.substring(0, 2).toLowerCase()}`}>{option.value}</span>;
}

export const certificationItemTemplate = (option) => {
    return <span className={`certification certification__${option.certification.substring(0, 2).toLowerCase()}`}>{option.certification}</span>;
}

export const directorItemTemplate = (option) => {
    return <span>{option.name}</span>
}

export const filterSetting = {
    'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'releaseDate': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'length': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'director': { value: null, matchMode: FilterMatchMode.IN },
    'certification': { value: null, matchMode: FilterMatchMode.EQUALS },
    'rating': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
}