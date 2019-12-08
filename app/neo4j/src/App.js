import React from "react";
import "./App.css";
import axios from "axios";
import ReactJson from "react-json-view";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      first: null,
      second: null,
      third: null,
      fourth: {
        a: null,
        b: null
      },
      fifth: {
        a: null,
        b: null
      },
      firstRes: null,
      secondRes: null,
      thirdRes: null,
      fourthRes: null,
      fifthRes: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.fetchFirst = this.fetchFirst.bind(this);
    this.fetchSecond = this.fetchSecond.bind(this);
    this.fetchThird = this.fetchThird.bind(this);
    this.fetchFourth = this.fetchFourth.bind(this);
    this.fetchFifth = this.fetchFifth.bind(this);
  }

  handleChange(e) {
    switch (e.target.name) {
      case "first": {
        this.setState({
          first: e.target.value
        });
        break;
      }
      case "second": {
        this.setState({
          second: e.target.value
        });
        break;
      }
      case "third": {
        this.setState({
          third: e.target.value
        });
        break;
      }
      case "fourth-a": {
        const b = this.state.fourth.b;
        this.setState({
          fourth: {
            a: e.target.value,
            b
          }
        });
        break;
      }
      case "fourth-b": {
        const a = this.state.fourth.a;
        this.setState({
          fourth: {
            a,
            b: e.target.value
          }
        });
        break;
      }
      case "fifth-a": {
        const b = this.state.fifth.b;
        this.setState({
          fifth: {
            a: e.target.value,
            b
          }
        });
        break;
      }
      case "fifth-b": {
        const a = this.state.fifth.a;
        this.setState({
          fifth: {
            a,
            b: e.target.value
          }
        });
        break;
      }
    }
  }

  fetchFirst() {
    let currentComponent = this;
    axios
      .get(`/findByNumber/${this.state.first}`)
      .then(function(response) {
        console.log(response);
        currentComponent.setState({
          firstRes: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fetchSecond() {
    let currentComponent = this;
    axios
      .get(`/findByRelationship/${this.state.second}`)
      .then(function(response) {
        console.log(response);
        currentComponent.setState({
          secondRes: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fetchThird() {
    let currentComponent = this;
    axios
      .get(`/findByDeepRelation/${this.state.third}`)
      .then(function(response) {
        console.log(response);
        currentComponent.setState({
          thirdRes: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fetchFourth() {
    let currentComponent = this;
    axios
      .get(`/findShortestPath/${this.state.fourth.a}&${this.state.fourth.b}`)
      .then(function(response) {
        console.log(response);
        currentComponent.setState({
          fourthRes: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  fetchFifth() {
    let currentComponent = this;
    axios
      .get(`/aggregate/${this.state.fifth.a}&${this.state.fifth.b}`)
      .then(function(response) {
        console.log(response);
        currentComponent.setState({
          fifthRes: response.data.data
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="endpoint-container grey-bg">
          <h4 className="text-center">Find a node by a property</h4>
          <div className="row text-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Bus number</label>
                <input
                  type="text"
                  className="form-control"
                  id="bus-number"
                  placeholder="WAT420"
                  name="first"
                  onChange={this.handleChange}
                />
                <button
                  name="first"
                  type="button"
                  className="btn btn-success"
                  onClick={this.fetchFirst}
                >
                  Find
                </button>
              </div>
            </div>
            <div className="col-6">
              The output:
              <p>
                {this.state.firstRes ? (
                  <ReactJson theme="monokai" src={this.state.firstRes} />
                ) : null}
              </p>
            </div>
          </div>
        </div>
        <div className="endpoint-container light-bg">
          <h4 className="text-center">Find nodes by a relationship</h4>
          <div className="row text-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">
                  Bus station name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bus-station-name"
                  placeholder="Vilnius Bus Station"
                  name="second"
                  onChange={this.handleChange}
                />
                <button type="button" className="btn btn-success" onClick={this.fetchSecond}>
                  Find
                </button>
              </div>
            </div>
            <div className="col-6">
              The output:
              <p>
                {this.state.secondRes ? (
                  <ReactJson theme="monokai" src={this.state.secondRes} />
                ) : null}
              </p>
            </div>
          </div>
        </div>
        <div className="endpoint-container grey-bg">
          <h4 className="text-center">
            Find nodes by a deeper-end relationship
          </h4>
          <div className="row text-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">
                  Bus station A name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bus-station-a"
                  placeholder="Vilnius Bus Station"
                  name="third"
                  onChange={this.handleChange}
                />
                <button type="button" className="btn btn-success" onClick={this.fetchThird}>
                  Find
                </button>
              </div>
            </div>
            <div className="col-6">
              The output:
              <p>
                {this.state.thirdRes ? (
                  <ReactJson theme="monokai" src={this.state.thirdRes} />
                ) : null}
              </p>
            </div>
          </div>
        </div>
        <div className="endpoint-container light-bg">
          <h4 className="text-center">Find the shortest path</h4>
          <div className="row text-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">City A</label>
                <input
                  type="text"
                  className="form-control"
                  id="city-a"
                  placeholder="Vilnius"
                  name="fourth-a"
                  onChange={this.handleChange}
                />
                <label htmlFor="exampleFormControlInput1">City B</label>
                <input
                  type="text"
                  className="form-control"
                  id="city-b"
                  placeholder="Kaunas"
                  name="fourth-b"
                  onChange={this.handleChange}
                />
                <button type="button" className="btn btn-success" onClick={this.fetchFourth}>
                  Find
                </button>
              </div>
            </div>
            <div className="col-6">
              The output:
              <p>
                {this.state.fourthRes ? (
                  <ReactJson theme="monokai" src={this.state.fourthRes} />
                ) : null}
              </p>
            </div>
          </div>
        </div>
        <div className="endpoint-container grey-bg">
          <h4 className="text-center">Aggregation</h4>
          <div className="row text-center">
            <div className="col-6">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">City A</label>
                <input
                  type="text"
                  className="form-control"
                  id="length-a"
                  placeholder="Vilnius"
                  name="fifth-a"
                  onChange={this.handleChange}
                />
                <label htmlFor="exampleFormControlInput1">City B</label>
                <input
                  type="text"
                  className="form-control"
                  id="length-b"
                  placeholder="Kaunas"
                  name="fifth-b"
                  onChange={this.handleChange}
                />
                <button type="button" className="btn btn-success" onClick={this.fetchFifth}>
                  Find
                </button>
              </div>
            </div>
            <div className="col-6">
              The output:
              <p>
                {this.state.fifthRes ? (
                  <ReactJson theme="monokai" src={this.state.fifthRes} />
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
