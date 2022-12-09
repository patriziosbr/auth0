//all fontawesome icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const iconList = Object
    .keys(Icons)
    .filter(key => key !== "fas" && key !== "prefix" )
    .map(icon => Icons[icon])

library.add(...iconList)
//END all fontawesome icons

export const units = [
    {
      name: "kitchen",
      icon:  <FontAwesomeIcon icon="faucet" />
    },
    {
      name: "bathroom",
      icon:  <FontAwesomeIcon icon="bath" />
    },
    {
      name: "bedroom",
      icon:  <FontAwesomeIcon icon="bed" />
    },
    {
      name: "living-room",
      icon:  <FontAwesomeIcon icon="couch" />
    }
  ];