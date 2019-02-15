import React, { Component } from 'react';
import { getMarvelCharacters } from '../lib/apiCalls';
import './style.css';


class MarvelList extends Component {

    constructor(){
        super();
        this.state = {
            marvelInput : "",
            marvels : [],
            loading:"none"
        }
    }

    onChange(event) {
        this.setState ({
            marvelInput : event.target.value
        });
    }

    searchMarvel (event) {
        event.preventDefault();
        this.cleanMarvel();
        this.setState ({
            loading : "block",
        });
        let recherche = new Promise((resolve, reject) => {
              var data = getMarvelCharacters({ name: this.state.marvelInput})
                resolve(data);
            });
            recherche.then((data) => {
                console.log(data.characters);
                this.setState ({
                    loading : "none",
                });

                for (let i = 0; i < data.characters.length; i++){
                    let oneMarvel = {
                        id : data.characters[i].id,
                        name : data.characters[i].name,
                        image : data.characters[i].thumbnail.path + "." + data.characters[i].thumbnail.extension,
                        description : data.characters[i].description,
                        link : data.characters[i].urls[(data.characters[i].urls.length)-1].url
                    }
                    this.addMarvel (oneMarvel);
                }
            })
    }

    cleanMarvel() {
        this.setState ({
            marvels : [],
        });
    }

    addMarvel(onvavoir) {
        this.setState ({
            marvelInput : "",
            marvels : [...this.state.marvels, onvavoir],
        });
    }

    renderMarvels(){
            return this.state.marvels.map ((marvel) => {
                return (
                    <div className = "card text-light bg-marvel-dark" key = {marvel.id}>
                        <img src = {marvel.image} className="card-img-top" alt={marvel.name}></img>
                        <div className="card-body">
                            <h5 className="card-title">{marvel.name}</h5>
                            <p className="card-text">{marvel.description}</p>
                            <a href={marvel.link} target="_blank" className="btn btn-outline-light" rel="noopener noreferrer">See Comics</a>
                        </div>
    
                    </div>                 
                )
            })
    }

    render() {
        return (
            <div>
                <h1 align="center"> Marvel Comics Search Engine</h1>
                <form className = "form-inline justify-content-between"> 
                    <input 
                        value = {this.state.marvelInput} 
                        type = "text" 
                        placeholder = 'Call a Marvel'
                        onChange = {this.onChange.bind(this)}
                        className = "form-control mb2  col-md-11 light-input"
                    />
                    <button
                    className = "btn btn-outline-light"
                    onClick = {this.searchMarvel.bind(this)}>
                        GO
                    </button>
                </form>
                <div className="text-center mt-10" style={{display:this.state.loading}}>
                    <div className="spinner-grow text-light m-10" 
                    role="status" 
                    style={{width: "15rem", height: "15rem"}}
                    > 
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                <div className="card-columns mt-3">
                    { this.renderMarvels() }
                </div>
            </div>
        );
    }
}

export default MarvelList;