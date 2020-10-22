import React, {Component} from 'react';
import {TodoList} from "./TodoList";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import Dialog from './Dialog';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FilterDialog from './FilterDialog';
import EditDialog from './EditDialog';
import SearchIcon from '@material-ui/icons/Search';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import axios from 'axios';
export class MainView extends Component{

    constructor(props) {
        super(props);
        this.state = {items: [],
            text: '', status: '', dueDate: moment(), responsible:'',isOpen:false,isOpenFilter:false,filtering:false};
        this.state.itemsFiltered = [{status:"",dueDate: moment(),responsible:""}];
        this.state.itemsShow = [];

    }

    render() {
        return (
            <div className="App">
                <TodoList todoList={this.state.filtering ? this.state.itemsShow: this.state.items}/>
                <Dialog
                handleTextChange = {this.handleTextChange}
                handleStatusChange = {this.handleStatusChange}
                handleDateChange = {this.handleDateChange}
                handleRespChange = {this.handleRespChange}
                handleSubmit = {this.handleSubmit}
                handleOpen = {this.handleOpen}
                open = {this.state.isOpen}
                state = {this.state}>
                </Dialog>

                <FilterDialog
                handleStatusChange = {this.handleStatusChangeFilter}
                handleDateChange = {this.handleDateChangeFilter}
                handleRespChange = {this.handleRespChangeFilter}
                handleSubmit = {this.handleSubmitFilter}
                handleOpenFilter = {this.handleOpenFilter}
                handleChangeFiltering = {this.handleChangeFiltering}
                open = {this.state.isOpenFilter}
                state = {this.state}>
                </FilterDialog>

                <EditDialog
                handleOpenEdit =  {this.handleOpenEdit}

                handleRespChange = {this.handleRespChangeEdit}
                handleSubmit = {this.handleSubmitEdit}

                open = {this.state.isOpenEdit}
                state = {this.state}>
                </EditDialog>

                <Fab aria-label='Add' onClick={() => this.handleOpen()} color='secondary'
                style = {{ position: "absolute", right: "0px", bottom: "0", margin: "10px" }}>
                    <AddIcon/>
                </Fab>
                <Fab aria-label='Filter' onClick={() => this.handleOpenFilter()} color='secondary'
                style = {{ position: "absolute", right: "0px", bottom: "75px", margin: "10px" }}>
                    <SearchIcon/>
                </Fab>
                <Fab aria-label='change' onClick={() => this.handleOpenEdit()} color='secondary'
                style = {{ position: "absolute", right: "0px", bottom: "150px", margin: "10px" }}>
                    <AccountBoxIcon />
                </Fab>
            </div>
        );
    }

    // Handle de Editar

    handleOpenEdit = () => this.setState({
        isOpenEdit : !this.state.isOpenEdit
    });

    handleRespChangeEdit = (resp) =>{
        this.setState({
            newname: resp.target.value
        });
    }

    handleSubmitEdit = (e) => {
        console.log(this.state.newname)

        const users = JSON.parse(localStorage.getItem("users"));
        console.log(users)

        this.handleOpenEdit();
    }




    // Handle de filtro

    handleStatusChangeFilter = (e) => {

        this.state.itemsFiltered[0].status = e.target.value;
        this.setState(
            this.state
        );
    }

   handleDateChangeFilter = (e) => {

        this.state.itemsFiltered[0].dueDate = e;
        this.setState(
            this.state
    );

    }

    handleRespChangeFilter = (e) =>{

        this.state.itemsFiltered[0].responsible = e.target.value;
        this.setState(
            this.state
        );

    }

    handleSubmitFilter = () =>{
        this.state.itemsShow = [];
        var itemsI = this.state.items;
        var itemsF = this.state.itemsFiltered;
        for (var i = 0 ; i < itemsI.length; i++){
            if (itemsI[i].status === itemsF[0].status ||  itemsI[i].dueDate === itemsF[0].dueDate.toString() || itemsI[i].responsible === itemsF[0].responsible){
                this.state.itemsShow.push(itemsI[i]);
            }
        }
        this.setState(this.state);
        this.handleFiltering();
        this.handleOpenFilter();

    }

    handleOpenFilter = () =>{
        this.setState({
            isOpenFilter : !this.state.isOpenFilter
        });
    }

    // Handle de Add

    handleOpen = ()=>{
        this.setState({
            isOpen : !this.state.isOpen
        });
    }

    handleFiltering = () =>{
        this.setState({
            filtering : !this.state.filtering
        })
    }

    handleTextChange = (e) => {
        this.setState({
            text: e.target.value
        });
    }

    handleStatusChange = (e)=> {
        this.setState({
            status: e.target.value
        });
    }

    handleDateChange = (date) =>{
        this.setState({
            dueDate: date
        });
    }

    handleRespChange = (resp) =>{
        this.setState({
            responsible: resp.target.value
        });
    }

    handleSubmit = (e) => {
        console.log(this.state);
        e.preventDefault();
        if (!this.state.text.length || !this.state.status.length || !this.state.dueDate || !this.state.responsible.length){
            alert("Error: Campos sin llenar !");
            return;
          }
        const newItem = {
              text: this.state.text,
              status: this.state.status,
              dueDate: this.state.dueDate,
              responsible : this.state.responsible,
        };

        this.agregarTask(newItem);


        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            status: '',
            dueDate: null,
            responsible :''
        }));
        this.handleOpen();
        this.handleFiltering();

      }

      //http://localhost:8080/api
        async componentDidMount() {
          await axios.get('http://localhost:8080/api',
          {
              headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer " + localStorage.getItem("token")
                      }
          })
           .then(response => {
              this.setState({
                  items: response.data
              });
           })
           .catch(e => {
              console.log(e);
              alert("Error");

           });
        }

        // https://taskplannerieti.azurewebsites.net/api/list-tasks?code=7Fsi5lElz3ImDt3a4ne9KqDaRhbvV/pNfVexRdvTa/1ZySexKBZYnw==
        agregarTask = (task) => {
          axios.post('http://localhost:8080/api',
          task,
          {
              headers: {
                      "Content-Type": "application/json",
                      "Authorization": "Bearer " + localStorage.getItem("token")
                      }
          })
           .then(response => {
              this.componentDidMount();
           })
           window.location.reload()
           .catch(error => {
              console.log(error)
              alert("Error");
           });
    }
}
