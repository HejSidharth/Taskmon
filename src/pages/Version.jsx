import React from "react";

const VersionHistory = () => {
  const versions = [
    {
      versionNumber: "2.0 🎉",
      date: "December20th 2023",
      description:
        "🚀 Major update - TaskMon now supports online note saving and account creation. 🌐🔐",
      features: [
        "💾 Notes can now be saved online and accessed from anywhere.",
        "👤 Added support for user accounts.",
        "🔄 You can sync your notes across multiple devices.",
        // Add more features if needed
      ],
    },
    {
      versionNumber: "1.0 🚀",
      date: "December  2023",
      description:
        "Initial release - TaskMon: A task management app to boost productivity. 📝",
      features: [
        "✅ Added ability to create new notes.",
        "🔒 Focused on user privacy and data security.",
        // Add more features if needed
      ],
    },
    // Add more versions if necessary
  ];

  return (
    <div className="mx-auto px-6 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">📚 Version History 📚</h1>
      <div className="join join-vertical w-full">
        {versions.map((version, index) => (
          <div key={index} className="collapse collapse-arrow join-item border border-base-300">
            <input type="radio" name="version-accordion" id={`version-${index}`} defaultChecked={index === 0} />
            <label htmlFor={`version-${index}`} className="collapse-title text-xl font-medium">
              {version.versionNumber}
            </label>
            <div className="collapse-content">
  <p className="mb-4 font-bold text-xl">{version.date}</p>
  <p className="mb-4">{version.description}</p>
  <div className="text-lg">
    {version.features.map((feature, featIndex) => (
      <p key={featIndex} className="mb-2">
        {feature}
      </p>
    ))}
  </div>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VersionHistory;
