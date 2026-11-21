import './ProgressBar.css'
export default function ProgressBar({ percent, purchased, total }) {
  return (
    <div className="progress">
      <div className="progress-head">
        <h2>Shopping progress</h2>
        <span className="progress-percent">{percent}%</span>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label="Items purchased"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`${percent}% complete, ${purchased} of ${total} items purchased`}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="progress-caption">
        {total === 0
          ? 'Add items to start tracking.'
          : percent === 100
            ? 'All done. Everything is in the basket.'
            : `${purchased} of ${total} items purchased`}
      </p>
    </div>
  )
}
