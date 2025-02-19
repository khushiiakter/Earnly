import que from "../assets/Coins-amico.png"

const WhyUs = () => {
    return (
        <div className=" py-8">
            <div className="p-5">
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">About Us</h2>
                    <p className="font-medium px-4 text-gray-600">
                        The Micro Tasking and Earning Platform, earnly is designed to provide users with opportunities to complete small tasks and earn money.
                    </p>
                </div>
                <div className="flex md:flex-row flex-col gap-9 p-6 items-center justify-between">
                    {/* Left Section: Text */}
                    <div className="">
                        <p className="px-2 text-center md:text-left text-gray-700 mb-5">
                            Our platform accommodates 3 distinct roles: Worker, Buyer, and Admin. Each role is tailored with specific functionalities to ensure seamless task management, task creation, and platform administration.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6">
                            <div className="flex items-center md:text-left text-center flex-col md:flex-row space-y-2 md:space-x-4">
                               
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Worker</h3>
                                    <p className="text-sm text-gray-600">
                                        Completes tasks to earn rewards by viewing tasks, submitting them for review, withdrawing coins, and receiving notifications.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center md:text-left text-center flex-col md:flex-row space-y-2 md:space-x-4">
                                
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Buyer</h3>
                                    <p className="text-sm text-gray-600">
                                        Manages tasks and payments by creating tasks, reviewing submissions, paying Workers, purchasing coins, and reporting issues.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center md:text-left text-center flex-col md:flex-row space-y-2 md:space-x-4">
                                
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Admin</h3>
                                    <p className="text-sm text-gray-600">
                                        Oversees platform operations by managing user roles, addressing reports, and maintaining system integrity.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center md:text-left text-center flex-col md:flex-row space-y-2 md:space-x-4">
                                
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">Genuine User Reviews</h3>
                                    <p className="text-sm text-gray-600">
                                        Verified reviews from real users.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Section: Illustration */}
                    <div className="w-full">
                        <img
                            src={que}
                            alt="Platform Illustration"
                            className="rounded-lg w-full h-[470px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;