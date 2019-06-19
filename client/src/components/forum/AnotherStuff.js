import React, { Component } from "react";
import { Link } from "react-router-dom";

class AnotherStuff extends Component {
  render() {
    return (
      <React.Fragment>
        <tr>
          <td>
            <Link>Трансформаторы, катушки, генераторы</Link>
            <p>
              Здесь можно обмениваться данными о ремонте катушек,
              трансформаторов и генераторов
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <Link>Cварочные устройства</Link>
            <p>
              Обсуждение ремонта и перемотки сварочных трансформаторов и
              устройств
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <Link>Вентиляторы, вытяжки, кондиционеры</Link>
            <p>
              Обсуждение ремонта вентиляторов, вытяжек, кондиционеров и их узлов
            </p>
          </td>
        </tr>
      </React.Fragment>
    );
  }
}

export default AnotherStuff;
