import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import {Modal, ModalBody, ModalHeader, ModalFooter, Button} from 'reactstrap';
import Summary from './Summary/Summary';
import {connect} from 'react-redux';
import { addIngredient, removeIngredient, updatePurchasable } from '../../Redux/ActionCreator';

const mapStateToProps = state => {
    return {
        ingredient: state.ingredient,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        addIngredient: (igType) => dispatch(addIngredient(igType)),
        removeIngredient: (igType) => dispatch(removeIngredient(igType)),
        updatePurchasable: () => dispatch(updatePurchasable()),
    }
}


class BurgerBuilder extends Component {
    state={
        modalOpen: false,
    }

addIngredientHandle = type =>{
    this.props.addIngredient(type);
    this.props.updatePurchasable();
}

removeIngredientHandle = type =>{
   this.props.removeIngredient(type);
   this.props.updatePurchasable();
}

toggleModal= () =>{
    this.setState({
        modalOpen: !this.state.modalOpen
    })
}

handleCheckout=()=>{
    this.props.history.push('/checkout')
}
    render() {
        return (
            <div>
                 <div className='d-flex flex-md-row flex-column'>
                    <Burger ingredient={this.props.ingredient}></Burger>
                    <Controls 
                    ingredientAdded = {this.addIngredientHandle}
                    ingredientRemoved={this.removeIngredientHandle}
                    price={this.props.totalPrice}
                    toggleModal={this.toggleModal}
                    purchasable={this.props.purchasable}
                    ></Controls>             
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>Your Order Summary</ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredient={this.props.ingredient}></Summary>
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{backgroundColor: '#D70F64'}} onClick={this.handleCheckout}>Continue to checkout...
                        </Button>
                        <Button color='secondary' onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            </div>
           
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);