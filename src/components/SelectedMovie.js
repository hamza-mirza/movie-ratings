function SelectedMovie({ selectedId, onCloseMovie }) {
  return (
    <div className="details">
      <button
        onClick={onCloseMovie}
        className="btn-back"
      >
        &larr;
      </button>
      <button>{selectedId}</button>
    </div>
  )
}

export default SelectedMovie
