import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode } from 'primereact/api';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';




function App() {
  const [data, setData] = useState(null);
  const [first, setFirst] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  //let directors = [];
  const [filters, setFilters] = useState({
    'title': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'releaseDate': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'length': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'director': { value: null, matchMode: FilterMatchMode.EQUALS },
    'certification': { value: null, matchMode: FilterMatchMode.EQUALS },
    'rating': { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  });


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
        /*         updatedData.forEach(movie => {
                  if (!directors.includes(movie.director)) {
                    directors.push(movie.director);
                  }
                }); */
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
  let directors = [{ name: " John Carney" }, { name: "Patty Jenkins" }, { name: "Travis Fine" }, { name: "Amy Poehler" }, { name: "David Ayer" },
  { name: "Zack Snyder" }, { name: "Pete Docter" }, { name: "Ryan Coogler" }, { name: "Luc Besson" }]

  const directorFilter = (options) => {
    return <MultiSelect value={options.value} options={directors} itemTemplate={directorItemTemplate}
      onChange={(e) => options.filterApplyCallback(e.value)} placeholder="Select a director" maxSelectedLabels={10} />;
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
          selectionMode="single"
          selection={selectedRow} onSelectionChange={e => setSelectedRow(e.value)}

          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"

          emptyMessage="No data found."
          currentPageReportTemplate=""
        >
          <Column field="title" header="Title" filter filterPlaceholder="Search by title" showFilterMenu={false} ></Column>
          <Column field="releaseDate" header="Year" filter filterPlaceholder="Search by year" showFilterMenu={false} ></Column>
          <Column field="length" header="Running time" filter filterPlaceholder="Search by time" showFilterMenu={false} ></Column>
          <Column field="director" header="Director" filter filterElement={directorFilter} showFilterMenu={false}></Column>
          <Column field="certification" header="Certification" filter filterElement={certificateFilter} showFilterMenu={false} ></Column>
          <Column field="rating" header="Rating" filter filterPlaceholder="Search by rating" showFilterMenu={false} ></Column>
        </DataTable>
      </section>

    </div>
  );
}

export default App;
