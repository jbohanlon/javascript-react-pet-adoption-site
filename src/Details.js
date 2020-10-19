import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    // pet.animal() fires an AJAX request and returns a Promise object.
    // We are binding a callback function on the Promise, using then(),
    // which will fire when the AJAX request is complete.
    pet.animal(this.props.id).then(({ animal }) => {
      this.setState({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        loading: false,
      });
      // eslint-disable-next-line no-console
    }, console.error);
  }

  render() {
    if (this.state.loading) {
      return <h1>Loading ...</h1>;
    }

    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div>
          <h1>{name}</h1>
          <h2>{`${animal} - ${breed} - ${location}`}</h2>
          <button>Adopt {name}</button>
          <p>{description}</p>
        </div>
      </div>
    );
  }
}

export default Details;