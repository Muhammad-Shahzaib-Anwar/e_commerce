import React from 'react'

function Footer() {
  return (
    <footer className="p-4 bg-gray-800 text-white">
    <div className="flex justify-around item-center">
      <div className="flex flex-col">
        <h3 className="font-bold mb-[10px]">WatchIT</h3>
        <p>Tells more than time</p>
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold mb-[10px]">Company</h3>
        <ul>
          <li>About</li>
          <li>Terms of Use</li>
          <li>Privacy Policy</li>
          <li>How it Works</li>
          <li>Contact Us</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold mb-[10px]">Support</h3>
        <ul>
          <li>Support Career</li>
          <li>24h Service</li>
          <li>Quick Chat</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <h3 className="font-bold mb-[10px]">Contact</h3>
        <ul>
          <li>Whatsapp</li>
          <li>Support 24h</li>
        </ul>
      </div>
    </div>
    <div className="text-center mt-[10px]">© 2024 WatchIT. All Rights Reserved.</div>
  </footer>
  )
}

export default Footer