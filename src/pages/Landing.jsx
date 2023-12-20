import React from "react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { IoMdInformationCircleOutline } from "react-icons/io";
import TimeSmall from "../components/TimeSmall";

export default function Landing() {
  return (
    <div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-3xl">✨The Taskmon Promise!✨</h3>
          <p className="py-4">
            Taskmon: Your Privacy Fortress! 🏰🔒 We're serious about your trust
            – zero data storage or selling here! Your tasks are sacred and
            solely yours. Work stress-free, knowing your privacy is our #1
            focus. 🌟 Let's tackle tasks together, safe and sound! 🚀💼
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <section className="text-center mt-10 h-screen">
        <div className="container mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row justify-center items-center">
            <div className="lg:w-1/2">
                <Link to='/version'>
                <code className="code btn btn-sm btn-ghost">Version 2.0</code>
                </Link>
              <h1 className="sm:text-6xl text-4xl font-bold leading-tight mb-4">
                📝 TaskMon 📝
              </h1>
              <p className="text-lg mb-8">
                🌟 Welcome to Taskmon – where managing tasks feels like a
                breeze! Get ready to supercharge your productivity! 🚀 Click
                'Get Started' to start jotting down your to-dos! 📝🔥 Let's crush
                those tasks together! 💪✨
              </p>
              <Link to="/task" onClick={() => toast.success("Welcome!")}>
                <button className="btn py-3 px-8 rounded-lg ">
                  Get Started! 🚀
                </button>
              </Link>
            </div>
          </div>
        </div>
        <button
          className="fixed bottom-5 right-7 w-16 h-16 text-white rounded-full text-2xl flex items-center justify-center btn z-10 tooltip"
          onClick={() => document.getElementById("my_modal_1").showModal()}
          data-tip="Help"
        >
          <IoMdInformationCircleOutline />
        </button>
        <div className="fixed bottom-5 left-5">
        </div>
      </section>
      <div className="fixed bottom-5 left-5">
          <TimeSmall />
        </div>    
        </div>
  );
}
