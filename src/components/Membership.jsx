

const Membership = () => {
    const roles = [
        {
          name: "Worker",
          description: "Completes tasks to earn rewards by viewing tasks, submitting them for review, withdrawing coins, and receiving notifications.",
          features: [
            "Access to task list",
            "Submit tasks for review",
            "Withdraw earned coins",
            "Receive task notifications",
          ],
        },
        {
          name: "Buyer",
          description: "Manages tasks and payments by creating tasks, reviewing submissions, paying Workers, purchasing coins, and reporting issues.",
          features: [
            "Create new tasks",
            "Review task submissions",
            "Pay Workers",
            "Purchase coins",
            "Report issues",
          ],
        },
        {
          name: "Admin",
          description: "Oversees platform operations by managing user roles, addressing reports, and maintaining system integrity.",
          features: [
            "Manage user roles",
            "Address reports",
            "Maintain system integrity",
          ],
        },
      ];
    
      return (
        <div className=" text-gray-900 py-14 px-5">
          <div className="max-w-6xl mx-auto">
            <h2 className="md:text-5xl text-3xl font-bold text-[#5f1a89] mb-6 text-center">
              Platform Roles
            </h2>
            <p className="text-gray-600 text-center my-6">
              The Micro Tasking and Earning Platform is designed to provide users with opportunities to complete small tasks and earn money.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 py-10 gap-6">
              {roles.map((role) => (
                <div
                  key={role.name}
                  className="bg-white p-6 flex flex-col justify-between rounded-lg shadow-lg hover:shadow-2xl"
                  aria-label={`${role.name} role`}
                >
                  <h3 className="text-3xl text-center font-bold mb-4 text-[#8e60ac]">
                    {role.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">{role.description}</p>
                  <ul className="text-sm text-gray-600 mb-4">
                    {role.features.map((feature, index) => (
                      <li key={index} className="mb-2 flex items-center">
                        <span className="text-green-500 mr-2" aria-hidden="true">✔</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-primary text-white border-none bg-[#5f1a89] hover:bg-green-700 w-full">
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

export default Membership;