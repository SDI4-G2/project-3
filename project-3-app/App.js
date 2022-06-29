import Navigation from "./navigation/navigation";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
  <StripeProvider publishableKey="pk_test_51LFr0wJNKgGm3CxKOwryeijUhanaQJLJScGT1DdQqdQGuAYgdhJQ4LC7KlKHQ9HxtMQWJhOdSraT1dQeaak5Ll5W00ro7lSeVT">
    <Navigation />
  </StripeProvider>
  );
}
