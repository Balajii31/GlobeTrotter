export default function SettingsPage() {
    return (
        <div className="p-4 lg:p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Settings
                </h1>
                <p className="text-muted-foreground mt-2">
                    Manage your account preferences and application settings.
                </p>
            </div>

            <div className="max-w-2xl space-y-6">
                {/* Account Settings */}
                <div className="bg-card border rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Account Settings</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b">
                            <div>
                                <p className="font-medium">Email Notifications</p>
                                <p className="text-sm text-muted-foreground">Receive trip updates via email</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between py-3 border-b">
                            <div>
                                <p className="font-medium">Push Notifications</p>
                                <p className="text-sm text-muted-foreground">Get mobile push notifications</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-medium">Newsletter</p>
                                <p className="text-sm text-muted-foreground">Subscribe to travel tips</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                        </div>
                    </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-card border rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4">Privacy</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between py-3 border-b">
                            <div>
                                <p className="font-medium">Profile Visibility</p>
                                <p className="text-sm text-muted-foreground">Make your profile public</p>
                            </div>
                            <select className="border rounded px-3 py-1">
                                <option>Public</option>
                                <option>Private</option>
                                <option>Friends Only</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between py-3">
                            <div>
                                <p className="font-medium">Activity Tracking</p>
                                <p className="text-sm text-muted-foreground">Allow analytics tracking</p>
                            </div>
                            <input type="checkbox" className="w-5 h-5" defaultChecked />
                        </div>
                    </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-destructive mb-4">Danger Zone</h2>
                    <div className="space-y-3">
                        <button className="w-full bg-destructive/20 hover:bg-destructive/30 text-destructive border border-destructive/50 rounded-lg py-2 transition-colors">
                            Delete Account
                        </button>
                        <button className="w-full bg-destructive/20 hover:bg-destructive/30 text-destructive border border-destructive/50 rounded-lg py-2 transition-colors">
                            Clear All Data
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
