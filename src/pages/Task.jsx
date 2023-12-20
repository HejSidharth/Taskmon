import React, { useEffect, useState, useRef } from "react";
import { MdOutlineFullscreen } from "react-icons/md";
import Time from "../components/Time";
import Weather from "../components/Weather";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";
import { RedirectToSignIn, SignedIn, SignedOut, useUser as u } from "@clerk/clerk-react";
import toast from "react-hot-toast";

export default function Table() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [alarmTime, setAlarmTime] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const user = useUser();
  const ideas = useIdeas();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const us = u();

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };
  const [showTable, setShowTable] = useState(true);
  const creation = () => toast.success("Note Added!");
  const deleted = () => toast("🗑️ Note Deleted!");
  const [input, setInput] = useState({ title: "", content: "" });
  const [reminders, setReminders] = useState(() => {
    const savedReminders = localStorage.getItem("reminders");
    return savedReminders ? JSON.parse(savedReminders) : [];
  });

  const [content, setContent] = useState('');
  const [contentError, setContentError] = useState('');
  

  const config = {
    angle: 90,
    spread: 360,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: "10px",
    height: "10px",
    perspective: "500px",
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };

  const [reminder, setReminder] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [checkedItems, setCheckedItems] = useState(
    JSON.parse(localStorage.getItem("checkedItems")) || {},
  );

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleContentChange = (e) => {
    const newContent = e.target.value;
  
    if (newContent.length > 200) {
      setContentError('Content must be 200 characters or less');
    } else {
      setContentError('');
      setContent(newContent);
    }
  };

  useEffect(() => {
    localStorage.setItem("checkedItems", JSON.stringify(checkedItems));

    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        searchInputRef.current.focus();
      }
    };

    localStorage.setItem("reminders", JSON.stringify(reminders));
    const interval = setInterval(() => {
      const now = new Date();
    }, 60000); // Check every minute
    const clock = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);

    return () => {
      clearInterval(clock);
    };
  }, [reminders]);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
      });
      if (alarmTime && alarmTime === currentTime && !alarmTriggered) {
        setShowModal(true);
        setAlarmTriggered(true);
      }
    }, 500); // Update every 500 milliseconds

    return () => {
      clearInterval(interval);
    };
  }, [alarmTime, alarmTriggered]);

  const handleAlarmTimeChange = (event) => {
    event.preventDefault();
    const inputAlarmTimeModified = event.target.value + ":00";
    setAlarmTime(inputAlarmTimeModified);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setAlarmTime(""); // Reset alarm time
    setAlarmTriggered(false); // Reset alarm triggered state
  };

  const handleAddReminder = () => {
    

    setReminders((prevReminders) => [
      ...prevReminders,
      { ...input, time: input.time }, // Convert input time to Date object
    ]);
    setInput({ title: "", content: "" });
    creation();
  };

  const handleRemoveReminder = (indexToRemove) => {
    setReminders((prevReminders) =>
      prevReminders.filter((_, index) => index !== indexToRemove),
    );

    return () => clearInterval(intervalId); // Clean up on unmount
  };
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);

  return (
    <div className="">
    <SignedIn>
      <dialog id="my_modal_3" className="modal">
      <div className="modal-box p-8 space-y-4 rounded-lg">
  <p className="text-3xl text-center">⏰ Set your alarm time! ⏰</p>

  <form className="flex items-center justify-center space-x-4 mt-3">
    <input className="input border-2 border-gray-300 p-2 rounded-md" type="time" onChange={handleAlarmTimeChange}></input>
  </form>
</div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
{showModal && (
  <dialog id="my_modal_4" className="modal" open>
    <div className="modal-box animate-bounce">
    <h1 className="text-3xl">✨Your Alarm Has Elapsed!✨</h1>
                <p className="mt-3">
                ⏰ Alarm Elapsed: Rise and Shine! 🌅✨ Your time is now! 
                </p>
    </div>
    <form method="dialog" className="modal-backdrop">
      <button onClick={handleCloseModal}>close</button>
    </form>
  </dialog>
)}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box m-10">
          <div className="carousel w-full">
            <div
              id="item1"
              className="carousel-item w-full flex flex-col justify-between"
            >
              <div>
                <h1 className="font-bold text-2xl mb-3">
                  📝 Add Your Title 📝
                </h1>
                <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              className="input input-bordered border sm:text-sm rounded-lg block w-full p-2.5"
            />
              </div>
              <div className="flex justify-end mt-5">
                <a href="#item2">
                  <button className="btn">Next ➡️</button>
                </a>
              </div>
            </div>

            <div
              id="item2"
              className="carousel-item w-full flex flex-col justify-between"
            >
              <div>
                <h1 className="font-bold text-2xl mb-3">
                  🔍 Add Your Details 🔍
                </h1>
                <textarea
  placeholder="Description"
  value={description}
  onChange={(event) => {
    if (event.target.value.length <= 200) {
      setDescription(event.target.value);
      handleContentChange(event);
    }
  }}
  className="input input-bordered sm:text-sm rounded-lg block w-full p-2.5 h-12 resize-none"
/>
            {contentError && <p className="text-red-500">{contentError}</p>}
              </div>
              <div className="flex justify-between w-full  mt-5">
                <a href="#item1">
                  <button className="btn mt-5">⬅️ Previous</button>
                </a>
                <button
  type="button"
  onClick={() => {
    const newIdea = { userId: us?.user?.id, title, description };
    ideas.add(newIdea);
    setTitle("");
    setDescription("");
    toast.success("Note Added!");
  }}
  className="btn mt-5"
>
Add Task ➕
</button>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close ❌</button>
        </form>
      </dialog>
      <div className="overflow-x-auto">
        <div className="flex flex-col items-center justify-center min-h-screen">
          <header
            className={`p-5 text-center ${showTable ? "" : "mt-[-200px]"}`}
          >
            <button
              onClick={() => setShowTable((prevShowTable) => !prevShowTable)}
            >
              <Time/>
              <Weather />
            </button>
          </header>
          {showTable && (
  <table className="table max-w-3xl mx-auto overflow-hidden mt-5 mb-20">
    {/* head */}
    <thead>
      <tr>
        <th className="w-1/12 px-4 py-2"></th>
        <th>
          <input
            type="checkbox"
            className="checkbox checkbox-sm"
            disabled
            checked
          />
        </th>
        <th className="w-4/12 px-4 py-2 overflow-wrap break-word">
          Title
        </th>
        <th
          style={{ width: "384px" }}
          className="max-w-sm  px-4 py-2 overflow-wrap break-word"
        >
          Content
        </th>
      </tr>
    </thead>
    <tbody>
      {ideas.current
        .filter(idea => us.user && us.user.id === idea.userId)
        .map((idea, index) => (
            <tr className="break-words" key={idea.$id}>
            <th>{index + 1}</th>
            <td>
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                onChange={(e) => {
                  if (e.target.checked) {
                    toast("🎉 Congrats! You completed a task! 🎉");
                  } else {
                    toast("😢 Oops! The task is not completed! 😢");
                  }
                }}
              />
            </td>
            <td>{idea.title}</td>
            <td className="overflow-auto break-words max-w-sm">
              {idea.description}
            </td>
            <td className="overflow-auto break-words max-w-sm">
            </td>
            <th>
              <button
                className="btn btn-ghost btn-xs"
                onClick={() => {
                    ideas.remove(idea.$id) // Adjust this to remove the idea
                  deleted();
                }}
              >
                Remove
              </button>
            </th>
          </tr>
        ))
        .concat(
            ideas.current.filter(idea => us.user && us.user.id === idea.userId).length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  No ideas set.
                </td>
              </tr>
            ) : null,
        )}
    </tbody>
  </table>
)}
        </div>
      </div>
      <div className="tooltip" data-tip="hello">
        <button
          className="fixed bottom-5 left-5 w-16 h-16 text-white rounded-full text-2xl flex items-center justify-center btn z-10 tooltip"
          onClick={toggleFullscreen}
          data-tip="Fullscreen"
        >
          <MdOutlineFullscreen />
        </button>
      </div>
      <button
        className="fixed bottom-5 right-5 w-16 h-16 text-white rounded-full text-2xl flex items-center justify-center btn z-10 tooltip"
        onClick={() => document.getElementById("my_modal_2").showModal()}
        data-tip="Help"
      >
        ?
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="carousel w-full">
            <div
              id="item1"
              className="carousel-item w-full flex flex-col justify-between"
            >
              <div>
                <h1 className="text-3xl">✨Welcome To TaskMon!✨</h1>
                <p className="mt-3">
                  Welcome to Taskmon 🎉 – your go-to hub for streamlined task
                  management! 🚀 Ready to take control of your to-dos? 📋 Click
                  'New Note' 📝 to start jotting down your tasks and watch your
                  productivity soar! 📈✨ Remember, you can click on the clock
                  ⏰ to show or hide the table. 🔄
                </p>{" "}
              </div>
              <div className="flex justify-end">
                <button
                  className="btn"
                  onClick={() => document.getElementById("my_modal_2").close()}
                >
                  Get Started 🚀
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
        </SignedOut>
    </div>
  );
}
