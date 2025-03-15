import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to create an Account with Profile
async function createAccountWithProfile() {
    const account = await prisma.account.create({
        data: {
            email: 'aljhondupal@gmail.com',
            username: 'AlJhonDupal1023',
            password: 'aljhon123456789',
            profile: {
                create: {
                    lastName: 'Dupal',
                    middleName: 'Lucero',
                    firstName: 'Al Jhon',
                    suffix: '',
                    bio: 'Just do it.',
                    picture: 'aljhon.jpg',
                },
            },
        },
        include: { profile: true },
    });
    console.log('Created Account with Profile:', account);
}

// Function to add a Module to an existing Account
async function addModuleToAccount(accountId: number) {
    const module = await prisma.module.create({
        data: {
            accountID: accountId,
            accountCode: 'AC10001',
            moduleCode: 'MC20001',
            moduleDetails: 'ACT 1',
            moduleDesc: 'This is my activity 1',
        },
    });
    console.log('Module Added:', module);
}

// Function to fetch all Accounts with Profiles and Modules
async function fetchAccountsWithProfilesAndModules() {
    const accounts = await prisma.account.findMany({
        include: {
            profile: true,
            modules: true,
        },
    });
    console.log('Accounts with Profiles and Modules:', accounts);
}

// Main function that calls all other functions
async function main() {
    await createAccountWithProfile();
    await addModuleToAccount(1); // Make sure this ID exists in the database
    await fetchAccountsWithProfilesAndModules();
}

// Execute main function
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
