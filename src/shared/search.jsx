import React, { useCallback, useState } from 'react';
import _ from 'lodash';

const Search = () => {
  const [input, setInput] = useState('');

  const debounce = _.debounce((receive) => {
    console.log(receive);
  }, 1000);

  const throttle = _.throttle((e) => {
    console.log(e.target.value);
  }, 1000);

  const keyPress = useCallback(debounce, []);

  const changeText = (e) => {
    keyPress(e.target.value);
  };

  return (
    <div>
      <input type='text' onChange={changeText} />
    </div>
  );
};

export default Search;
