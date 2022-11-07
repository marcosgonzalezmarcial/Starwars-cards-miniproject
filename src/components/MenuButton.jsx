import './MenuButton.css'

export const MenuButton = () => {
  return (
    <div
      className="hamburger hamburger--collapse-r navbar-toggle-btn bg-light me-auto"
      aria-controls="basic-navbar-nav"
    >
      <div className="hamburger-box">
        <div className="hamburger-inner"></div>
      </div>
    </div>
  )
}
