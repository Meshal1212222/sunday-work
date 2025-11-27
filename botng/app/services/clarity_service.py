"""
Microsoft Clarity Service
جلب بيانات سلوك المستخدم من Clarity
"""

import os
from datetime import datetime, timedelta
from typing import Dict, Any, List
import httpx

class ClarityService:
    def __init__(self):
        self.project_id = os.getenv("CLARITY_PROJECT_ID", "")
        self.api_key = os.getenv("CLARITY_API_KEY", "")
        self.base_url = "https://www.clarity.ms/api/v1"

    async def get_heatmap_data(self) -> Dict[str, Any]:
        """جلب بيانات الخرائط الحرارية"""

        if not self.project_id or not self.api_key:
            return await self._get_mock_heatmap()

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/projects/{self.project_id}/heatmaps",
                    headers={"Authorization": f"Bearer {self.api_key}"}
                )
                if response.status_code == 200:
                    return response.json()
                return await self._get_mock_heatmap()
        except Exception as e:
            print(f"❌ Clarity Heatmap Error: {e}")
            return await self._get_mock_heatmap()

    async def get_session_recordings(self, limit: int = 10) -> List[Dict[str, Any]]:
        """جلب تسجيلات الجلسات"""

        if not self.project_id or not self.api_key:
            return await self._get_mock_recordings()

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/projects/{self.project_id}/recordings",
                    headers={"Authorization": f"Bearer {self.api_key}"},
                    params={"limit": limit}
                )
                if response.status_code == 200:
                    return response.json()
                return await self._get_mock_recordings()
        except Exception as e:
            print(f"❌ Clarity Recordings Error: {e}")
            return await self._get_mock_recordings()

    async def get_user_insights(self) -> Dict[str, Any]:
        """جلب رؤى سلوك المستخدم"""

        if not self.project_id or not self.api_key:
            return await self._get_mock_insights()

        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/projects/{self.project_id}/insights",
                    headers={"Authorization": f"Bearer {self.api_key}"}
                )
                if response.status_code == 200:
                    return response.json()
                return await self._get_mock_insights()
        except Exception as e:
            print(f"❌ Clarity Insights Error: {e}")
            return await self._get_mock_insights()

    async def get_daily_summary(self) -> Dict[str, Any]:
        """ملخص يومي من Clarity"""
        heatmap = await self.get_heatmap_data()
        insights = await self.get_user_insights()
        recordings = await self.get_session_recordings(5)

        return {
            "date": datetime.now().strftime("%Y-%m-%d"),
            "heatmap_summary": heatmap,
            "user_insights": insights,
            "recent_recordings": len(recordings),
            "click_patterns": insights.get("click_patterns", {}),
            "scroll_depth": insights.get("scroll_depth", {}),
            "rage_clicks": insights.get("rage_clicks", 0),
            "dead_clicks": insights.get("dead_clicks", 0),
            "quick_backs": insights.get("quick_backs", 0)
        }

    async def _get_mock_heatmap(self) -> Dict[str, Any]:
        """Mock heatmap data"""
        return {
            "pages": [
                {
                    "url": "/",
                    "clicks": 450,
                    "hot_areas": ["header", "main-nav", "cta-button"]
                },
                {
                    "url": "/golden-host/",
                    "clicks": 280,
                    "hot_areas": ["dashboard-link", "library-link", "search"]
                },
                {
                    "url": "/sunday-board/",
                    "clicks": 195,
                    "hot_areas": ["task-list", "add-task", "filters"]
                }
            ],
            "total_clicks": 925,
            "source": "mock_data"
        }

    async def _get_mock_recordings(self) -> List[Dict[str, Any]]:
        """Mock recordings data"""
        return [
            {
                "id": "rec_001",
                "duration": 245,
                "pages_visited": 4,
                "device": "desktop",
                "country": "Saudi Arabia"
            },
            {
                "id": "rec_002",
                "duration": 180,
                "pages_visited": 3,
                "device": "mobile",
                "country": "UAE"
            },
            {
                "id": "rec_003",
                "duration": 320,
                "pages_visited": 6,
                "device": "desktop",
                "country": "Saudi Arabia"
            }
        ]

    async def _get_mock_insights(self) -> Dict[str, Any]:
        """Mock insights data"""
        return {
            "total_sessions": 234,
            "unique_visitors": 156,
            "avg_session_duration": 185,
            "click_patterns": {
                "navigation_clicks": 45,
                "cta_clicks": 78,
                "link_clicks": 123,
                "form_interactions": 34
            },
            "scroll_depth": {
                "25%": 95,
                "50%": 78,
                "75%": 52,
                "100%": 28
            },
            "rage_clicks": 12,
            "dead_clicks": 8,
            "quick_backs": 15,
            "excessive_scrolling": 6,
            "frustration_score": 18,
            "engagement_score": 72,
            "top_exit_pages": [
                "/golden-host/admin.html",
                "/sunday-board/board-pro.html"
            ],
            "source": "mock_data"
        }

clarity_service = ClarityService()
