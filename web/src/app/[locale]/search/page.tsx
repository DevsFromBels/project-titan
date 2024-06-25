"use client";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React, { useRef, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
};

type SearchProfileResponse = {
  searchProfile: {
    users: User[];
  };
};

const searchSchema = gql`
  query SearchProfile($userName: String!) {
    searchProfile(userName: $userName) {
      users {
        id
        name
        email
        role
        createdAt
      }
    }
  }
`;

const Page = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading } = useQuery<SearchProfileResponse>(searchSchema, {
    skip: !searchTerm,
    variables: {
      userName: searchTerm,
    },
  });

  const handleSearch = () => {
    ref.current?.value && setSearchTerm(ref.current.value);
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="mt-5 text-center">
        <h1 className="text-lg p-2">Поиск пользователей на платформе</h1>
        <div className="flex gap-2">
          <Input ref={ref} placeholder="search users" />
          <Button variant="outline" onClick={handleSearch}>
            Найти
          </Button>
        </div>
        {!loading && data?.searchProfile.users?.length && (
          <div className="mt-5">
            {data?.searchProfile.users.map((user) => (
              <Link key={user.id} href={`/profile/${user.id}`}>
              <div className="border p-4 rounded-lg">
                {user.name}
              </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
