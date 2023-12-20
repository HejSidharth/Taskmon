import React from 'react'
import { useUser } from '../lib/context/user';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

export default function Navbar1() {
  const user = useUser();
  const location = useLocation();

  return (
<div className="navbar">
  <div className="flex-1">
  <Link to="/" className="btn btn-ghost text-xl">
          📝 TaskMon 📝
        </Link>
  </div>
  <div className="flex items-center">
    <ul className="menu menu-horizontal px-1">
      <SignedOut>
        <li>
        <SignUpButton />
        </li>
        <li>
        <SignInButton />
        </li>
        </SignedOut>
        <SignedIn>
          <li>
          <Link to="/task" onClick={() => toast.s("Welcome!")}>
          Tasks
          </Link>
          </li>
        </SignedIn>
        {location.pathname === "/task" && (
              <li>
                <a
                  onClick={() =>
                    document.getElementById("my_modal_1").showModal()
                  }
                >
                  Add Note
                </a>
              </li>
            )}
            {location.pathname === "/task" && (
              <li>
                <a
                  onClick={() =>
                    document.getElementById("my_modal_3").showModal()
                  }
                >
                  Add Alarm 
                </a>
              </li>
            )}
            <li>
      <ThemeToggle />
      </li>
      <SignedIn>
      <li>
              <UserButton />
            </li>
      </SignedIn>
            
    </ul>
    
  </div>
</div>  )
}
