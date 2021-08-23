import React, { Component } from 'react';
import {Button, Modal, ModalBody} from 'reactstrap';
import {connect} from 'react-redux';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';
import {resetIngredient} from '../../../Redux/ActionCreator';

const mapStateToProps = state => {
    return {
        ingredient: state.ingredient,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
        userId: state.userId,
        token: state.token,
    }
}

const mayDispatchToProps = dispatch =>{
    return{
        resetIngredient: () => dispatch(resetIngredient())
    }
}

class Checkout extends Component {

    state={
        values: {
            deliveryAddress: '',
            phone: '',
            paymentType: 'Cash On Delivery',
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: '',
    }
goBack = () =>{
    this.props.history.goBack('/');
}

inputChangeHandler = (e) =>{
    this.setState({
        values: {
            ...this.state.values,
            [e.target.name]: e.target.value,
        }
    })
}

submitHandler =()=>{
    this.setState({isLoading: true})
    const order ={
        ingredient: this.props.ingredient,
        customer: this.state.values,
        price: this.props.totalPrice,
        orderTime: new Date(),
        userId: this.props.userId,
    }
    axios.post('https://burger-builder-f9e2a-default-rtdb.firebaseio.com/orders.json?auth=' + this.props.token, order)
    .then(res => {
        if(res.status === 200){
            this.setState({
                isLoading: false,
                isModalOpen: true,
                modalMsg: 'Order Placed Successfully!',
            })
            this.props.resetIngredient()
        }else{
            this.setState({
                isLoading: false,
                isModalOpen: true,
                modalMsg: 'Something Went Wrong! Order Again!',
            })
        }
    })
    .catch(err => {
        this.setState({
            isLoading: false,
            isModalOpen: true,
            modalMsg: 'Something Went Wrong! Order Again!',
        })
    })
}
    render() {
        let form =(<div>
            <h4 style={{border: '1px solid grey', boxShadow: '1px 1px #888', borderRadius: '5px', padding: '20px'}}>Payment: {this.props.totalPrice} BDT</h4>

            <form style={{border: '1px solid grey', boxShadow: '1px 1px #888', borderRadius: '5px', padding: '20px'}}>

                <textarea name="deliveryAddress" 
                value={this.state.values.deliveryAddress} 
                className='form-control' placeholder='Your Address' onChange={(e)=> this.inputChangeHandler(e)}></textarea><br />
                <input name="phone" className='form-control' value={this.state.values.phone} placeholder='Your Phone Number'  onChange={(e)=> this.inputChangeHandler(e)}/><br />
                <select name="paymentType" className='form-control' values={this.state.values.paymentType}>
                    <option value="Cash On Delivery">Cash On Delivery</option>
                    <option value="Bkash">Bkash</option>
                </select><br />
                <Button style={{backgroundColor: '#D70F64'}}  onClick={this.submitHandler} disabled={!this.props.purchasable}>Place Order</Button>
                <Button style={{backgroundColor: 'secondary'}} className="m-1" onClick={this.goBack}>Cancel</Button>
            </form>
        </div>)
        return (
            <div>
                {this.state.isLoading ? <Spinner></Spinner> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack}>
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mayDispatchToProps)(Checkout);