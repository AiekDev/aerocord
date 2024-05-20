using System;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace Updater
{ // this code sucks, but idgaf it does it job
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        private string GetAerocordPath()
        {
            // this has been done so you can move the directory anywhere without breaking aerocord's updater (just make sure updater.exe is in the same place as aerocord.exe/electron.exe)
            string everywherePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory);
            return Path.Combine(everywherePath);
        }

        private async void Update_Click(object sender, RoutedEventArgs e)
        {
            string ASARUrl = "https://github.com/AiekDev/aerocord/raw/main/Update/app.asar";
            string extractPath = GetAerocordPath();
            string ASARFilePath = Path.Combine(extractPath, "resources", "app.asar");

            try
            {
                // check if an older ASAR file already exists and delete if it does
                if (File.Exists(ASARFilePath))
                {
                    try
                    {
                        File.Delete(ASARFilePath);
                        UpdateStatus("Deleted old app.asar file.");
                    }
                    catch (Exception ex)
                    {
                        UpdateStatus($"Error deleting old app.asar file, close Aerocord first..");
                        return;
                    }
                }

                // download the new ASAR file!!
                try
                {
                    using (var webClient = new WebClient())
                    {
                        webClient.DownloadProgressChanged += (s, args) =>
                        {
                            UpdateStatus($"Downloading update... {args.ProgressPercentage}%");
                        };

                        await webClient.DownloadFileTaskAsync(new Uri(ASARUrl), ASARFilePath);
                    }

                    UpdateStatus("Aerocord has been successfully updated!");
                }
                catch (Exception ex)
                {
                    UpdateStatus($"Error: {ex.Message}");
                }
            }
            catch (Exception ex)
            {
                UpdateStatus($"Error: {ex.Message}");
            }
        }


        // made it like this cuz i was tired of writing "statusTextBlock.Content" everywhere.. like holy fuck its too long
        private void UpdateStatus(string message)
        {
            statusTextBlock.Content = message;
         }
       }
    }
