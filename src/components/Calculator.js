import React from 'react';


import './Calculator.css';

class Calculator extends React.Component {

    state = {
        input: '',
        calculated: false,
        
    }

    buttonClicked = (symbol) => {

        
        let input = document.getElementById('stam');

        if(this.state.input.length !==30)
        {
            if(this.state.calculated)
            {
                this.setState({input: symbol, calculated: false});
            }
            else
            {
                this.setState(prevState => ({
                    input: prevState.input + symbol
                }),(() => {
                    input.focus();
                    input.setSelectionRange(this.state.input.length-1,this.state.input.length-1)
                }))
            }
        }   


    }
    
    erase = () => {

        if(this.state.calculated)
        {
            this.setState({input: '', calculated: false})
        }
        else
        {
            let input = document.getElementById('stam');
            let newInput = this.state.input.substring(0,this.state.input.length-1);
            this.setState({input: newInput},(() => {
                input.focus();
                input.setSelectionRange(this.state.input.length-1,this.state.input.length-1)
            }));
        }
    }

   
    calculate = () => {

        if(this.state.input != '')
        {
            let output;
            try
            {
            output = eval(this.state.input);
            this.setState({input: output.toString(), calculated:true}) 
            }
            catch(e) 
            {
                this.setState({input: 'Error', calculated: true})
            }
        }
     
    }

    returnLeftSideElements = () => {

        let array = [];
        let item;
        for(let i = 0; i<12; i++)
        {
            if(i<9)
            {
                item = <input type='button' value={`${i+1}`} className='num-button' onClick={() => this.buttonClicked(`${i+1}`)}/>
            }
            else if(i === 9)
            {
                item = <input type='button' value={`0`} className='num-button' onClick={() => this.buttonClicked(`0`)}/>
            }
            else if (i === 10)
            {
                item = <input type='button' value={`=`} className='num-button equal' onClick={this.calculate} />
            }
            else if (i === 11)
            {
                item = <input type='button' value={`<`} className='num-button back' onClick={this.erase} />
            }

            array.push(item);
        }

        return array;
    }

    render() {

        let leftSideButtons = this.returnLeftSideElements();
        return (
            <div className='calc-container'>
                 <input type='text' id='stam' value={this.state.input}  className='calc-output' onChange={this.handleChange} readOnly/> 
                <div className='calc-num-container'>
                   {leftSideButtons}
                </div>
                <div className='calc-operator-container'>
                    <input type='button' value='+' className='num-button op' onClick={() => this.buttonClicked('+')}></input>
                    <input type='button' value='-' className='num-button op' onClick={() => this.buttonClicked('-')}></input>
                    <input type='button' value='x' className='num-button op' onClick={() => this.buttonClicked('*')}></input>
                    <input type='button' value='/' className='num-button op' onClick={() => this.buttonClicked('/')}></input>
                </div>
            </div>
        )
    }
}

export default Calculator