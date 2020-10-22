import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
  } from '@material-ui/pickers'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function EditDialog(props){

    return (
        <div>
          <Dialog
            open={props.open}
            TransitionComponent={Transition}
            keepMounted
            onClose={()=> props.handleOpenEdit()}
          >
            <DialogTitle id="alert-dialog-slide-title">{"Editar nombre de Usuario"}</DialogTitle>
            <DialogContent>
                    <form onSubmit={props.handleSubmit} className="todo-form">
                        <h3>Your New Name</h3>
                        <TextField
                            id="newname"
                            onChange={props.handleRespChange}
                            value={props.state.newname}>
                        </TextField>
                    </form>
                    <br/>
                    <br/>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=> props.handleOpenEdit()} color="secondary">
                Cancel
              </Button>
              <Button onClick={props.handleSubmit} color="primary">
                Change 
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
    