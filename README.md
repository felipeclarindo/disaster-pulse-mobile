 🌍 [Leia em Português](README.pt-BR.md)

# Disaster Pulse Mobile

Mobile Application to create alerts and send to the population about natural disasters.

## Technologies Used

- **React Native** - Framework for building cross-platform mobile applications.
- **Expo** - Development environment and tools for React Native apps.
- **TypeScript** - JavaScript superset with static typing.
- **React Navigation** - Navigation between app screens.
- **Api Backend** - API for connect with the database

## Features

- Crud to manage alerts.
- Dashboard with alert's summary.
- Page to controll alerts.

## Steps to install and run

1. Clone the api repository.

```bash
git clone https://github.com/felipeclarindo/disaster-pulse-api-dotnet.git
```

2. Enter directory:

```bash
cd disaster-pulse-api-dotnet
```

3. Run migrations:

```bash
dotnet ef database update --project ./Src/Infra
```

4. Run Api:

```bash
dotnet run --project ./Src/WebApi
```

5. Clone the Repository:

```bash
git clone https://github.com/felipeclarindo/disaster-pulse-mobile.git
```

6. Enter directory:

```bash
cd disaster-pulse-mobile
```

7. Install dependencies :

```bash
npm install
```

8. Make sure you have an android device to view the app(emulator or via debugging).

9. Run the app

```bash
npx expo start
```

10. Press `A` to open the application in android.

## Contribution

Contributions are welcome! If you have suggestions for improvements, feel free to open an issue or submit a pull request.

## Author

### **Felipe Clarindo**

- [LinkedIn](https://www.linkedin.com/in/felipeclarindo)
- [Instagram](https://www.instagram.com/lipethecoder)
- [GitHub](https://github.com/felipeclarindo)

## License

This project is licensed under the [GNU Affero License](https://www.gnu.org/licenses/agpl-3.0.html).
