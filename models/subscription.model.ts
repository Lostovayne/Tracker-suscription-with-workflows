import mongoose from "mongoose";

interface ISubscription extends Document {
  name: string;
  price: number;
  currency: string;
  frecuency?: string;
  category: string;
  paymentMethod: string;
  status?: string;
  startDate: Date;
  renewalDate: Date;
  user: mongoose.Types.ObjectId;
}

const subscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be greater than 0"],
      max: [1000, "Subscription price must be less than 1000"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "CLP", "GBP"],
      default: "USD",
    },
    frecuency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["entertaiment", "food", "health", "education", "travel", "anime", "other"],
      required: [true, "Category is required"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancel", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: (value: Date) => value <= new Date(),
        message: "Start date  must be less than current date",
      },
    },
    renewalDate: {
      type: Date,
      required: [true, "Start date is required"],
      validate: {
        validator: function (this: ISubscription, value: Date) {
          return value > this.startDate;
        },
        message: "Start date  must be less than current date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-calulate renewal date if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frecuency as keyof typeof renewalPeriods]
    );
  }
  next();
});

// Auto-update the status if renewal date has passed

export default mongoose.model<ISubscription>("Subscription", subscriptionSchema);
