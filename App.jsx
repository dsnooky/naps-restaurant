import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Home, Menu, Receipt } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NapsRestaurantApp() {
  const [page, setPage] = useState("home");
  const [receipt, setReceipt] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [cart, setCart] = useState([]);

  const foods = [
    { id: 1, name: "Chicken Inasal", price: 120 },
    { id: 2, name: "Pork Sisig", price: 150 },
    { id: 3, name: "Beef Tapa", price: 140 },
    { id: 4, name: "Halo-Halo", price: 90 }
  ];

  const addToCart = (food) => {
    setCart((prev) => [...prev, food]);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const Navbar = () => (
    <div className="flex justify-between items-center p-4 shadow-md bg-white sticky top-0 z-10">
      <h1 className="text-xl font-bold">NAP'S Restaurant</h1>
      <div className="flex gap-2">
        <Button variant={page === "home" ? "default" : "outline"} onClick={() => setPage("home")}>
          <Home className="w-4 h-4 mr-1"/> Home
        </Button>
        <Button variant={page === "menu" ? "default" : "outline"} onClick={() => setPage("menu")}>
          <Menu className="w-4 h-4 mr-1"/> Menu
        </Button>
        <Button variant={page === "cart" ? "default" : "outline"} onClick={() => setPage("cart")}>
          <ShoppingCart className="w-4 h-4 mr-1"/> Cart ({cart.length})
        </Button>
        <Button variant={page === "admin" ? "default" : "outline"} onClick={() => setPage("admin")}>Admin</Button>
      </div>
    </div>
  );

  const HomePage = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">Welcome to NAP'S Restaurant</h2>
      <p className="mb-6">Enjoy delicious Filipino meals delivered to your door.</p>
      <Button size="lg" onClick={() => setPage("menu")}>Order Now</Button>
    </motion.div>
  );

  const MenuPage = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 grid md:grid-cols-2 gap-4">
      {foods.map((food) => (
        <Card key={food.id} className="rounded-2xl shadow">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{food.name}</h3>
              <p>₱{food.price}</p>
            </div>
            <Button onClick={() => addToCart(food)}>Add</Button>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );

  const CartPage = () => {
    const [payment, setPayment] = useState(null);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const placeOrder = () => {
      const orderData = {
        items: cart,
        total,
        payment,
        address,
        phone,
        date: new Date().toLocaleString()
      };
      setReceipt(orderData);
      setCart([]);
      setOrderStatus("Preparing");
      setPage("receipt");

      setTimeout(() => setOrderStatus("Out for delivery"), 4000);
      setTimeout(() => setOrderStatus("Delivered"), 8000);
    };

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Order</h2>
        {cart.length === 0 && <p>No items yet.</p>}
        {cart.map((item, i) => (
          <Card key={i} className="mb-2">
            <CardContent className="p-3 flex justify-between">
              <span>{item.name}</span>
              <span>₱{item.price}</span>
            </CardContent>
          </Card>
        ))}

        {cart.length > 0 && (
          <>
            <h3 className="font-bold text-lg mt-4">Total: ₱{total}</h3>

            <div className="mt-4">
              <h4 className="font-semibold mb-1">Phone Number</h4>
              <input className="w-full border rounded-xl p-2" placeholder="09XXXXXXXXX" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-1">Delivery Address</h4>
              <textarea className="w-full border rounded-xl p-2" placeholder="Enter full delivery address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div className="mt-4">
              <h4 className="font-semibold mb-2">Select Payment Method</h4>
              <div className="flex gap-2">
                <Button variant={payment === "gcash" ? "default" : "outline"} onClick={() => setPayment("gcash")}>GCash</Button>
                <Button variant={payment === "cod" ? "default" : "outline"} onClick={() => setPayment("cod")}>Cash on Delivery</Button>
              </div>
            </div>

            <Button className="mt-6 w-full" size="lg" disabled={!payment || !address || !phone} onClick={placeOrder}>
              <Receipt className="w-4 h-4 mr-1"/> Place Order
            </Button>
          </>
        )}
      </motion.div>
    );
  };
      setReceipt(orderData);
      setCart([]);
      setOrderStatus("Preparing");
      setPage("receipt");

      // Simulate realtime order status progression
      setTimeout(() => setOrderStatus("Out for delivery"), 4000);
      setTimeout(() => setOrderStatus("Delivered"), 8000);
    };
    };

    const AdminPage = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 max-w-xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">Admin Order Control</h2>
          {!receipt && <p>No active order.</p>}
          {receipt && (
            <div className="space-y-2">
              <p><strong>Customer:</strong> {receipt.phone}</p>
              <p><strong>Total:</strong> ₱{receipt.total}</p>
              <p><strong>Current Status:</strong> {orderStatus}</p>
              <div className="flex gap-2 mt-3">
                <Button onClick={() => setOrderStatus("Preparing")}>Preparing</Button>
                <Button onClick={() => setOrderStatus("Out for delivery")}>Out for delivery</Button>
                <Button onClick={() => setOrderStatus("Delivered")}>Delivered</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  const ReceiptPage = () => (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 max-w-xl mx-auto">
      {!receipt && <p>No receipt.</p>}
      {receipt && (
        <div className="space-y-4">
          <Card className="rounded-2xl shadow">
            <CardContent className="p-6 text-left">
              <h2 className="text-2xl font-bold mb-2 text-center">Order Receipt</h2>
              <p className="text-sm text-gray-500 mb-4 text-center">{receipt.date}</p>

              {receipt.items.map((item, i) => (
                <div key={i} className="flex justify-between mb-1">
                  <span>{item.name}</span>
                  <span>₱{item.price}</span>
                </div>
              ))}

              <hr className="my-3" />
              <p><strong>Total:</strong> ₱{receipt.total}</p>
            <p><strong>Phone:</strong> {receipt.phone}</p>
              <p><strong>Payment:</strong> {receipt.payment === "gcash" ? "GCash" : "Cash on Delivery"}</p>
              <p><strong>Address:</strong> {receipt.address}</p>
            </CardContent>
          </Card>

          {/* SMS Confirmation UI */}
          <Card className="rounded-2xl shadow bg-green-50">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">SMS Confirmation</h3>
              <p className="text-sm">NAP'S Restaurant: Your order worth ₱{receipt.total} has been received and is now {orderStatus}. Thank you!</p>
            </CardContent>
          </Card>

          {/* Realtime Order Tracker */}
          <Card className="rounded-2xl shadow">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Order Status Tracker</h3>
              <div className="flex justify-between text-sm">
                <span className={orderStatus === "Preparing" ? "font-bold" : ""}>Preparing</span>
                <span className={orderStatus === "Out for delivery" ? "font-bold" : ""}>Out for delivery</span>
                <span className={orderStatus === "Delivered" ? "font-bold" : ""}>Delivered</span>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" onClick={() => setPage("home")}>Back to Home</Button>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <AnimatePresence mode="wait">
        {page === "home" && <HomePage key="home" />}
        {page === "menu" && <MenuPage key="menu" />}
        {page === "cart" && <CartPage key="cart" />}
        {page === "receipt" && <ReceiptPage key="receipt" />}
        {page === "admin" && <AdminPage key="admin" />}
      </AnimatePresence>
    </div>
  );
}
