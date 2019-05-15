import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData;
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: ""
        };
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    }

    

    componentDidMount() {
        this.init();
    }

    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData);
        loaderData.isLoading = false;
        this.setState({ loaderData });

        //comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)

        //console.log(this.state.loaderData)
    }

    loadData(callback) {
        var link = 'http://localhost:51689/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');
        // your ajax call and other logic goes here
        //alert("List of Sorted Employees");
        console.log(link);
        let self = this;

        fetch(link, {

            method: 'GET'
        }).then(function (response) {

            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }

            return response.json();

        }).then(function (data) {
            self.setState({ loadJobs: data });

            console.log("Jobs", self.state.loadJobs);
            alert(self.state.loadJobs.myJobs[0].description);
        }).catch(err => {
            console.log("caught it", err);
        });


    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                });
            });
        });
    }

    render() {
        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className="ui container">Your table goes here then!!!!!!
                    <button onClick={this.loadData} className="ui button">List of Jobs</button>
                    <div>{this.state.loadJobs.myJobs[0].description}</div>
                </div>
            </BodyWrapper>
        );
    }
}