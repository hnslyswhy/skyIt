import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';
import { getDirectorList, getCertificationList } from "./utility/getDataList";
import "./App.scss";



function App() {
  const [data, setData] = useState(null);
  const [first, setFirst] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [directors, setDirectors] = useState([])
  const [certifications, setCertifications] = useState([])
  const [filters, setFilters] = useState({
    'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'releaseDate': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'length': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'director': { value: null, matchMode: FilterMatchMode.IN },
    'certification': { value: null, matchMode: FilterMatchMode.EQUALS },
    'rating': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  });
  //slider
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    axios.get("https://skyit-coding-challenge.herokuapp.com/movies")
      .then((res) => {
        let updatedData = res.data.map(movie => {
          movie.rating = (movie.rating / 5 * 100).toFixed(2).toString() + "%";
          return movie;
        })
        setData(updatedData);

        //get certification
        let results = getCertificationList(updatedData)
        setCertifications(results)

        // get all directors
        results = getDirectorList(updatedData)
        setDirectors(results)
      })
      .catch(e => console.log(e))
  }, [])

  //certification dropdown
  const certificateFilter = (options) => {
    return <Dropdown value={options.value} options={certifications} itemTemplate={certificationItemTemplate} showClear
      onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Select a certification" />;
  }

  const certificationItemTemplate = (option) => {
    return <span className={`classification classification__${option.value}`}>{option.value}</span>;
  }

  //director dropdown
  const directorFilter = (options) => {
    return <MultiSelect value={options.value} options={directors} itemTemplate={directorItemTemplate} showClear
      onChange={(e) => options.filterApplyCallback(e.value)} optionLabel="name" optionValue="name" placeholder="Select a director" maxSelectedLabels={1} />
  }

  const directorItemTemplate = (option) => { return <span >{option.name}</span> }


  return (
    <div className="move">
      <h1 className="move__title">Favorite Movie List</h1>

      <DataTable className="table" value={data}
        paginator
        rows={10}
        //paginator
        first={first}
        onPage={(e) => setFirst(e.first)}
        currentPageReportTemplate=""
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        //dropdown box filter
        filters={filters}
        filterDisplay="row"
        // row selection
        selection={selectedRow} onSelectionChange={e => { setSelectedRow(e.value); setDisplayModal(true) }}

        responsiveLayout="scroll"
        emptyMessage="No data found."
      >
        <Column
          selectionMode="single"></Column>
        <Column field="title" header="Title" filter filterPlaceholder="Search by title" showFilterMenu={false} style={{ minWidth: '12rem' }} className="table__text" ></Column>
        <Column field="releaseDate" header="Year" filter filterPlaceholder="Search by year" showFilterMenu={false} style={{ minWidth: '12rem' }} className="table__text"></Column>
        <Column field="length" header="Running time" filter filterPlaceholder="Search by time" showFilterMenu={false} style={{ minWidth: '12rem' }} className="table__text"></Column>
        <Column field="director" header="Director" filter filterElement={directorFilter} showFilterMenu={false} style={{ minWidth: '12rem' }} className="table__text"></Column>
        <Column field="certification" header="Certification" filter filterElement={certificateFilter} showFilterMenu={false} style={{ minWidth: '12rem' }} ></Column>
        <Column field="rating" header="Rating" filter filterPlaceholder="Search by rating" showFilterMenu={false} style={{ minWidth: '12rem' }} className="table__text"></Column>
      </DataTable>

      <Dialog
        header="MOVIE DETAILS"
        footer="All movie data are from Wikipedia and IMDb"
        modal
        visible={displayModal}
        style={{ width: '30vw' }}
        onHide={() => setDisplayModal(false)}
        position="right">
        {selectedRow && <article>
          <h2>{selectedRow.title}</h2>
          <p>Directed by {selectedRow.director}</p>
          <p>Cast: {selectedRow.cast.map((person, index) => <span key={index}>{person}</span>)}</p>
          <p>Genre: {selectedRow.genre.map((genre, index) => <span key={index}>{genre}</span>)}</p>
          <div>
            <p>Plot:</p>
            <p>{selectedRow && selectedRow.plot}</p>
          </div>
        </article >}
      </Dialog >

    </div>
  );
}

export default App;
