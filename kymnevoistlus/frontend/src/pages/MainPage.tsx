import { useEffect, useState } from 'react';
import { Person } from '../models/Person';
import { Link } from 'react-router-dom';

function MainPage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [totalPersons, setTotalPersons] = useState(0);
  const [page, setPage] = useState(0);
  const [activeCountry, setActiveCountry] = useState("ALL");
  const [sort, setSort] = useState("id,asc");

  const personsPerPage = 3;

  useEffect(() => {
    fetch("http://localhost:8080/persons/countries")
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  useEffect(() => {
    fetchPersonsByCountry(activeCountry, page);
  }, [sort]);

  function fetchPersonsByCountry(country: string, currentPage: number) {
    setActiveCountry(country);
    setPage(currentPage);

    fetch(`http://localhost:8080/persons/persons-countries?country=${country}&size=${personsPerPage}&page=${currentPage}&sort=${sort}`)
      .then(res => res.json())
      .then(data => {
        setPersons(data.content);
        setTotalPersons(data.totalElements);
      });
  }

  function changePage(newPage: number) {
    fetchPersonsByCountry(activeCountry, newPage);
  }

  return (
    <div>
      <h2>Filter Person by Country</h2>
      <h6>Total Persons: {totalPersons}</h6>
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h3>Sort By</h3>
        <button onClick={() => setSort("id,asc")}>The Newest</button>
        <button onClick={() => setSort("id,desc")}>The oldest</button>
        <button onClick={() => setSort("name,asc")}>A-Z</button>
        <button onClick={() => setSort("name,desc")}>Z-A</button>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => fetchPersonsByCountry("ALL", 0)}>
          All Countries
        </button>
        {countries.map(country => (
          <button
            key={country}
            onClick={() => fetchPersonsByCountry(country, 0)}
          >
            {country}
          </button>
        ))}
      </div>

      {
        persons.map(person => (
          <div key={person.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc" }}>
            <div style={{ marginBottom: "10px" }}>
              <div><strong>Name:</strong> {person.name}</div>
              <div><strong>Country:</strong> {person.country}</div>
              <div><strong>Age:</strong> {person.age}</div>
              <div><strong>Total Result:</strong> {person.totalResult}</div>
              <Link to={"/persons/" + person.id}>
                <button style={{ borderColor: "grey", borderRadius: "20px", backgroundColor: "white", color: "black" }}>See More</button>
              </Link>
            </div>
          </div>
        ))
      }

      <div style={{ marginTop: "40px" }}>
        <button disabled={page === 0} onClick={() => changePage(page - 1)}>Previous</button>
        <span style={{ margin: "0 10px" }}>{page + 1}</span>
        <button
          disabled={page === Math.ceil(totalPersons / personsPerPage - 1)}
          onClick={() => changePage(page + 1)}
        >Next</button>
      </div>
    </div >
  );
}

export default MainPage;
