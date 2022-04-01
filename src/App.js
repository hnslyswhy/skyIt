import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';



function App() {
  const [data, setData] = useState(null);
  const [filters, setFilters] = useState({
    'title': { value: null, matchMode: FilterMatchMode.CONTAINS },
    'releaseDate': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'length': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'director': { value: null, matchMode: FilterMatchMode.IN },
    'certification': { value: null, matchMode: FilterMatchMode.EQUALS },
    'rating': { value: null, matchMode: FilterMatchMode.EQUALS }
  });

  useEffect(() => {
    axios.get("https://skyit-coding-challenge.herokuapp.com/movies")
      .then((res) => {

        let updatedData = res.data.map(movie => {
          movie.rating = (movie.rating / 5 * 100).toFixed(2).toString() + "%";
          return movie;
        })
        setData(updatedData)
      })
      .catch(e => console.log(e))
  }, [])


  return (
    <div className="App">
      <section className="table">
        <DataTable value={data}
          paginator
          filters={filters}
          filterDisplay="row"
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          rows={10}
          emptyMessage="No data found."
          currentPageReportTemplate=""
        >
          <Column field="title" header="Title"></Column>
          <Column field="releaseDate" header="Year"></Column>
          <Column field="length" header="Running time"></Column>
          <Column field="director" header="Director"></Column>
          <Column field="certification" header="Certification"></Column>
          <Column field="rating" header="Rating"></Column>
        </DataTable>
      </section>

      {/* <section className="card">
        <div className="card">
          <h5>Filter Row</h5>
          <p>Filters are displayed inline within a separate row.</p>
          <DataTable value={customers2} paginator className="p-datatable-customers" rows={10}
            dataKey="id" filters={filters2} filterDisplay="row" loading={loading2} responsiveLayout="scroll"
            globalFilterFields={['name', 'country.name', 'representative.name', 'status']} header={header2} emptyMessage="No customers found.">
            <Column field="name" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
            <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" />
            <Column header="Agent" filterField="representative" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '14rem' }} body={representativeBodyTemplate}
              filter filterElement={representativeRowFilterTemplate} />
            <Column field="status" header="Status" showFilterMenu={false} filterMenuStyle={{ width: '14rem' }} style={{ minWidth: '12rem' }} body={statusBodyTemplate} filter filterElement={statusRowFilterTemplate} />
            <Column field="verified" header="Verified" dataType="boolean" style={{ minWidth: '6rem' }} body={verifiedBodyTemplate} filter filterElement={verifiedRowFilterTemplate} />
          </DataTable>
        </div>
      </section> */}
    </div>
  );
}

export default App;
