
const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <span>
                    <p>
                        © {new Date().getFullYear()} Copyright: 
                        <strong>Task Manager</strong> by <a href="/">Pankaj Kumar</a>.
                    </p>
                </span>
            </footer>
        </div>
    )
}

export default Footer;