import requests

class APIClient:
    def __init__(self, base_url, timeout=30):
        self.base_url = base_url.rstrip("/")
        self.timeout = timeout

    # ---------- GET ----------
    def get(self, endpoint, params=None):
        print(f"GET {endpoint} ")
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        res = requests.get(url, params=params, timeout=self.timeout)
        res.raise_for_status()
        return res.json()

    # ---------- POST (JSON) ----------
    def post(self, endpoint, data=None):
        print("POST", endpoint)
        url = f"{self.base_url}/{endpoint.lstrip('/')}"
        res = requests.post(url, json=data, timeout=self.timeout)
        res.raise_for_status()
        return res.json()
    

    def post_file(self, endpoint, file_bytes):
        print("POST FILE", endpoint)
        url = f"{self.base_url}/{endpoint.lstrip('/')}"

        files = {"file": ("doc.pdf", file_bytes)}
        res = requests.post(url, files=files, timeout=self.timeout)

        res.raise_for_status()
        return res.json()