import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';



function App() {
  const [data, setData] = useState(null);
  const [first, setFirst] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  //let directors = [];
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
          console.log(movie.director)
          movie.rating = (movie.rating / 5 * 100).toFixed(2).toString() + "%";
          return movie;
        })
        setData(updatedData);
        // get all directors
        let directorLabels = updatedData.map(movie => {
          if (!directors.includes({ label: movie.director })) {
            return {
              label: movie.director
            }
          }
        });
        console.log(directorLabels);
      })
      .catch(e => console.log(e))
  }, [])

  //certification dropdown
  const certifications = [{ label: 'General', value: "General" }, { label: 'CA-PG', value: "CA-PG" }, { label: '14 Accompaniment', value: "14 Accompaniment" }];

  const certificateFilter = (options) => {
    return <Dropdown value={options.value} options={certifications}
      onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Select a certification" showClear />;
  }

  //director dropdown
  let directors = [{ name: "John Carney" }, { name: "Patty Jenkins" }, { name: "Travis Fine" }, { name: "Amy Poehler" }, { name: "David Ayer" },
  { name: "Zack Snyder" }, { name: "Pete Docter" }, { name: "Ryan Coogler" }, { name: "Luc Besson" }]

  const directorFilter = (options) => {
    return <MultiSelect value={options.value} options={directors} itemTemplate={directorItemTemplate} showClear
      onChange={(e) => options.filterApplyCallback(e.value)} optionLabel="name" optionValue="name" placeholder="Select a director" maxSelectedLabels={1} />;
  }

  const directorItemTemplate = (option) => {
    return (
      <div >
        <span >{option.name}</span>
      </div>
    );
  }





  return (
    <div className="move">
      <h1 className="title">Favorite Movie List</h1>
      <section className="table">
        <DataTable value={data}
          paginator
          rows={10}
          //paginator
          first={first}
          onPage={(e) => setFirst(e.first)}
          //dropdown box filter
          filters={filters}
          filterDisplay="row"
          // row selection
          selection={selectedRow} onSelectionChange={e => {
            console.log(e.value)
            setSelectedRow(e.value);
            setDisplayModal(true)
          }}

          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"

          emptyMessage="No data found."
          currentPageReportTemplate=""
        >
          <Column
            selectionMode="single"></Column>
          <Column field="title" header="Title" filter filterPlaceholder="Search by title" showFilterMenu={false} ></Column>
          <Column field="releaseDate" header="Year" filter filterPlaceholder="Search by year" showFilterMenu={false} ></Column>
          <Column field="length" header="Running time" filter filterPlaceholder="Search by time" showFilterMenu={false} ></Column>
          <Column field="director" header="Director" filter filterElement={directorFilter} showFilterMenu={false}></Column>
          <Column field="certification" header="Certification" filter filterElement={certificateFilter} showFilterMenu={false} ></Column>
          <Column field="rating" header="Rating" filter filterPlaceholder="Search by rating" showFilterMenu={false} ></Column>
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
      </section>

    </div>
  );
}

export default App;
