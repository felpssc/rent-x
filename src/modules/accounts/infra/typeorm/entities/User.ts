import "dotenv/config";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  getAvatarUrl(avatar: string): string {
    const { DISK_STORAGE } = process.env;

    switch (DISK_STORAGE) {
      case "local":
        return `${process.env.APP_API_URL}/avatar/${avatar}`;
      case "s3":
        return `${process.env.AWS_BUCKET_PREFIX_URL}/avatar/${avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { User };
