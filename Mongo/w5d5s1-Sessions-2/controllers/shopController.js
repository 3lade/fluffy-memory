const login = (req, res) => {
        const { username, role } = req.body;
            // username = "john",
            // role = "admin";
        if(!username || !role)
        {
            return res.status(400).json({message: "Username and role are required"})
        }
        if(role !=="admin" && role !== "staff")
        {
            return res.status(400).json({message: "Invalid role. Must be admin or staff"})
        }

        req.session.user = {
            username, role
        }
        return res.status(200).json({message: `Welcome ${username} (${role})`})

}

const dashboard = (req, res) => {
    const role = req.session.user.role;

    if(!role)
    {
        return res.status(401).json({message: "Please log in to access this route."})
    }

    if(role === "admin") {
        return res.status(200).json({
            message: "Admin Dashboard",
            data: {
                sales: "20000 today",
                staffManaged: 12,
                inventoryStatus: "All stocked"
            }
        })
    } else if(role === "staff") {
        return res.status(200).json({
            message: "Staff Dashboard",
            data: {
                assignedTasks: ["Stock shelves", "Assist customers"],
                shiftTime: "9AM - 5PM"
            }
        })
    } else {
        return res.status(403).json({message: "Role not authorized"})
    }
}

module.exports = {
    login,
    dashboard
}