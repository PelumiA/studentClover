import React, { useState } from 'react';
import axios from 'axios';

interface SearchResult {
    name: string;
    school: string;
    typeOfSchool: string;
    amountNeeded: string;
    bio: string;
};

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/search?q=${query}`);
            setResults(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <h2>Search Students</h2>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                />
            </div>
            <button className="btn btn-primary" onClick={handleSearch}>Search</button>
            <div>
                {results.map((result, index) => (
                    <div key={index} className="result">
                        <h3>{result.name}</h3>
                        <p>{result.school}</p>
                        <p>{result.typeOfSchool}</p>
                        <p>{result.amountNeeded}</p>
                        <p>{result.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
