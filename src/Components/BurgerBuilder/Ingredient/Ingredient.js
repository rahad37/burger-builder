import React from 'react';
import BreadTop from '../../../Assets/images/top.png';
import BreadBottom from '../../../Assets/images/bottom.png';
import Cheese from '../../../Assets/images/cheese.png';
import Meat from '../../../Assets/images/meat.png';
import Salad from '../../../Assets/images/salad.png';
import './Ingredient.css';


const Ingredient = props => {
    let ingredient = null;

    switch(props.type){
        case 'bread-bottom':
            ingredient = <div><img src={BreadBottom} alt="Bottom Bread" /></div>
            break;
            case 'bread-top':
            ingredient = <div><img src={BreadTop} alt="Top Bread" /></div>
            break;
            case 'meat':
            ingredient = <div><img src={Meat} alt="Meat" /></div>
            break;
            case 'salad':
            ingredient = <div><img src={Salad} alt="Salad" /></div>
            break;
            case 'cheese':
            ingredient = <div><img src={Cheese} alt="Cheese" /></div>
            break;
        default:
            ingredient = null;
    }
    return (
        <div className='Ingredient'>
            {ingredient}
        </div>
    );
};

export default Ingredient;