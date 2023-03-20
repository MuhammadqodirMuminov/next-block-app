import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { navItems } from "src/config/constants";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import CloseIcon from "@mui/icons-material/Close";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useRouter } from "next/router";

interface Props {
	window?: () => Window;
}

const Navbar = ({ window }: Props) => {
	const [mobileOpen, setMobileOpen] = useState(false);
	const router = useRouter();

	const handleDrawerToggle = () => {
		setMobileOpen((prevState) => !prevState);
	};

	const drawer = (
		<Box
			onClick={handleDrawerToggle}
			sx={{
				textAlign: "center",
			}}>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					paddingX: "20px",
				}}>
				<Box
					sx={{
						my: 2,
						display: "flex",
						alignItems: "center",
						gap: "5px",
						cursor: "pointer",
					}}
					onClick={() => router.push("/")}>
					<AdjustIcon />
					<Typography variant="h6">Sammi</Typography>
				</Box>

				<CloseIcon sx={{ cursor: "pointer" }} />
			</Box>

			<Divider />
			<List>
				{navItems.map((item) => (
					<ListItem key={item.route} disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText primary={item.label} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box height={"10vh"} sx={{ display: "flex" }}>
			<AppBar
				sx={{ height: "10vh", backgroundColor: "#141414" }}
				component="nav">
				<Toolbar sx={{ height: "10vh" }}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>

					<Box
						sx={{
							cursor: "pointer",
							my: 2,
							alignItems: "center",
							gap: "5px",
							flexGrow: 1,
							display: { xs: "none", sm: "flex" },
						}}
						onClick={() => router.push("/")}>
						<AdjustIcon />
						<Typography variant="h6" component="div">
							Sammi
						</Typography>
					</Box>

					<Box sx={{ display: { xs: "none", sm: "block" } }}>
						{navItems.map((item) => (
							<Button key={item.route} sx={{ color: "#fff" }}>
								{item.label}
							</Button>
						))}
					</Box>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: "100%",
						},
					}}>
					{drawer}
				</Drawer>
			</Box>
		</Box>
	);
};

export default Navbar;
