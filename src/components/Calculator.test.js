import React from 'react';
import { shallow } from 'enzyme';
import Calculator from './Calculator';



describe('Calculator Component', () => {

    let wrapper = shallow(<Calculator/>);
    let buttonClickedMock = jest.fn(num => {
        wrapper.setState(prevState => ({
            input: prevState.input + num
        })
    )})

    it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
    })

    it('change state correct to input', () => {
        buttonClickedMock('1');
        buttonClickedMock('245');
        buttonClickedMock('+');
        buttonClickedMock('5');
        expect(wrapper.state('input')).toEqual('1245+5');
    })

    it('calculates the input correctly', () => {
        wrapper.setState({input: '2+2'});
        wrapper.instance().calculate();
        expect(wrapper.state('input')).toEqual('4');
    })

    
})