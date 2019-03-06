import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'
import { Creators as FavoritesActions } from '../../store/ducks/favorites'

class Main extends Component {
  state = {
    repositoryInput: ''
  }

  handleAddRepository = async e => {
    try {
      e.preventDefault()

      const repo = await this.props.addFavoriteRequest(
        this.state.repositoryInput
      )
      console.log(repo)
      this.setState({ repositoryInput: '' })
    } catch (err) {}
  }

  render () {
    return (
      <>
        <form onSubmit={this.handleAddRepository}>
          <input
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Adicionar</button>
          {this.props.favorites.loading && <span>Carregando...</span>}
          {!!this.props.favorites.error && (
            <strong style={{ marginLeft: '.5rem', color: '#b00' }}>
              {this.props.favorites.error}
            </strong>
          )}
        </form>

        <ul>
          {this.props.favorites.data.map(favorite => (
            <li key={favorite.id}>
              <p>
                <strong>{favorite.name}</strong> ({favorite.description})
              </p>
              <a href={favorite.url}>Acessar</a>
            </li>
          ))}
        </ul>
      </>
    )
  }
}

Main.propTypes = {
  addFavoriteRequest: PropTypes.func.isRequired,
  favorites: PropTypes.shape({
    error: PropTypes.oneOfType([() => null, PropTypes.string]),
    loading: PropTypes.bool,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string
      })
    )
  })
}

const mapStateToProps = state => ({
  favorites: state.favorites
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoritesActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
