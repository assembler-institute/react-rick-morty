import React, { Component } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import CharacterCard from "../../components/CharacterCard";
import Episode from "../../components/Episodes";
import { getCharacter } from "../../api";

class Character extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasLoaded: false,
      hasError: false,
      errorMessage: null,
    };
    this.characterLoadInfo = this.characterLoadInfo.bind(this);
  }

  async characterLoadInfo() {
    try {
    } catch (error) {}
  }
}

export default Character;
