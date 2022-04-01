import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("https://skyit-coding-challenge.herokuapp.com/movies")
      .then((res) => setData(res.data))
      .catch(e => console.log(e))
  }, [])

  console.log(data[0])

  return (
    <div className="App">
      <section className="table">
        <DataTable value={data} paginator responsiveLayout="scroll"
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
    </div>
  );
}

export default App;
