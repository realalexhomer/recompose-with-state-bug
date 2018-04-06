import * as React from 'react';
import { compose, withPropsOnChange, withState, withHandlers} from 'recompose';

const containerOne = compose(
    withState('isWorking', 'setIsWorking', false),
    withPropsOnChange(() => false, (props) => props),
    withHandlers({isItWorking: ({setIsWorking}) => {
            setIsWorking(true);  // does nothing
        }
    })
);

const containerTwo = compose(
    withPropsOnChange(() => false, (props) => props),
    withState('isWorking', 'setIsWorking', false),  // moving the withState call below withPropsOnChange makes the setState call work
    withHandlers({isItWorking: ({setIsWorking}) => {
            setIsWorking(true);
        }
    })
);

const containerThree = compose(
    withState('isWorking', 'setIsWorking', false),
    withPropsOnChange(() => false, (props) => null), // returning null instead of props makes it work
    withHandlers({isItWorking: ({setIsWorking}) => {
            setIsWorking(true);
        }
    })
);

const TestComponent = ({
   isWorking,
   isItWorking
}) => (
    <div>
        {isWorking ? 'Its working!' : 'Its a bug'}
        <button onClick={isItWorking}>
            This should work
        </button>
    </div>

);

const TestOne = containerOne(TestComponent);
const TestTwo = containerTwo(TestComponent);
const TestThree = containerThree(TestComponent);

const Test = () => (
    <div>
        <TestOne />
        <TestTwo />
        <TestThree />
    </div>
);


export default Test;
