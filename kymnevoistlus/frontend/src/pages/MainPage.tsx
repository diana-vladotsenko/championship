import { useEffect, useState } from 'react';
import { Person } from '../models/Person';

function MainPage() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [totalPersons, setTotalPersons] = useState(0);
  const [page, setPage] = useState(0);
  const [activeCountry, setActiveCountry] = useState("ALL");

  const personsPerPage = 3;

  // Fetch list of distinct countries
  useEffect(() => {
    fetch("http://localhost:8080/persons/countries")
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  // Initial fetch of all persons
  useEffect(() => {
    fetchPersonsByCountry("ALL", 0);
  }, []);

  // Fetch persons filtered by country & page
  function fetchPersonsByCountry(country: string, currentPage: number) {
    setActiveCountry(country);
    setPage(currentPage);

    fetch(`http://localhost:8080/persons/persons-countries?country=${country}&size=${personsPerPage}&page=${currentPage}`)
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


      {persons.map(person => (
        <div key={person.id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc" }}>
          <div><strong>Name:</strong> {person.name}</div>
          <div><strong>Country:</strong> {person.country}</div>
          <div><strong>Age:</strong> {person.age}</div>
          <div><strong>Total Result:</strong> {person.totalResult}</div>
        </div>
      ))}

      <div style={{ marginTop: "40px" }}>
        <button disabled={page === 0} onClick={() => changePage(page - 1)}>Previous</button>
        <span style={{ margin: "0 10px" }}>{page + 1}</span>
        <button
          disabled={page === Math.ceil(totalPersons / personsPerPage - 1)}
          onClick={() => changePage(page + 1)}
        >Next</button>
      </div>
    </div>
  );
}

export default MainPage;
